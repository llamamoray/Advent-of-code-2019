const board = {};

function setValue(x, y, value) {
  if (!board[x]) {
    board[x] = {};
  }
  board[x][y] = value;
}

function getValue(x, y) {
  return board[x] ? board[x][y] : null;
}

const modes = {
  DRAW: 1,
  INTERSECTION: 2,
};

function path(path, currentPoisition, mode) {
  const result = [];
  let stepCount = 0;
  path.forEach(p => {
    const direction = p[0];
    const steps = Number(p.slice(1));

    for (let s = 0; s < steps; s++) {
      stepCount++;
      switch (direction) {
        case 'U': {
          currentPoisition = [currentPoisition[0], currentPoisition[1] + 1];
          break;
        }
        case 'D': {
          currentPoisition = [currentPoisition[0], currentPoisition[1] - 1];
          break;
        }
        case 'L': {
          currentPoisition = [currentPoisition[0] - 1, currentPoisition[1]];
          break;
        }
        case 'R': {
          currentPoisition = [currentPoisition[0] + 1, currentPoisition[1]];
          break;
        }
      }

      if (mode === modes.DRAW) {
        setValue(currentPoisition[0], currentPoisition[1], stepCount);
      }
      if (mode === modes.INTERSECTION) {
        const w1Val = getValue(currentPoisition[0], currentPoisition[1]);
        if (w1Val) {
          result.push({ pos: [...currentPoisition], w1Val, w2Val: stepCount });
        }
      }
    }
  });

  return result;
}

function printMinManhattanDistance(w1, w2) {
  let currentPoisition1 = [0, 0];
  let currentPoisition2 = [0, 0];

  path(w1, currentPoisition1, modes.DRAW);
  const intersections = path(w2, currentPoisition2, modes.INTERSECTION);

  const distances = intersections.map(coordinates => ({
    distance: Math.abs(coordinates.pos[0]) + Math.abs(coordinates.pos[1]),
    w1Val: coordinates.w1Val,
    w2Val: coordinates.w2Val,
  }));

  const minManDist = Math.min(...distances.map(d => d.distance));
  const minSteps = Math.min(...distances.map(d => d.w1Val + d.w2Val));

  console.log({ minManDist, minSteps });

}

const data = require('./data');

printMinManhattanDistance(data.test1, data.test2);
printMinManhattanDistance(data.test3, data.test4);
printMinManhattanDistance(data.wire1Path, data.wire2Path);