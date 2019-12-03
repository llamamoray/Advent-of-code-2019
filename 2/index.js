const ADD = 1;
const MULTIPLY = 2;
const END = 99;

function getProgramState(input) {
  let currentOpCodePosition = 0;
  let done = false;

  while (!done) {
    let currentOpCode = input[currentOpCodePosition];
    const index1 = input[currentOpCodePosition + 1];
    const index2 = input[currentOpCodePosition + 2];
    const targetIndex = input[currentOpCodePosition + 3];

    switch (currentOpCode) {
      case END: {
        done = true;
        break;
      }
      case ADD: {
        input[targetIndex] = input[index1] + input[index2];
        break;
      }
      case MULTIPLY: {
        input[targetIndex] = input[index1] * input[index2];
        break;
      }
      default: {
        throw 'invalid OP code';
      }
    }

    currentOpCodePosition = currentOpCodePosition + 4;
  }

  return input;
}

function getInput() {
  return [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 13, 19, 1, 9, 19, 23, 1, 6, 23, 27, 2, 27, 9, 31, 2, 6, 31, 35, 1, 5, 35, 39, 1, 10, 39, 43, 1, 43, 13, 47, 1, 47, 9, 51, 1, 51, 9, 55, 1, 55, 9, 59, 2, 9, 59, 63, 2, 9, 63, 67, 1, 5, 67, 71, 2, 13, 71, 75, 1, 6, 75, 79, 1, 10, 79, 83, 2, 6, 83, 87, 1, 87, 5, 91, 1, 91, 9, 95, 1, 95, 10, 99, 2, 9, 99, 103, 1, 5, 103, 107, 1, 5, 107, 111, 2, 111, 10, 115, 1, 6, 115, 119, 2, 10, 119, 123, 1, 6, 123, 127, 1, 127, 5, 131, 2, 9, 131, 135, 1, 5, 135, 139, 1, 139, 10, 143, 1, 143, 2, 147, 1, 147, 5, 0, 99, 2, 0, 14, 0];
}

let done = false;

for (let noun = 0; noun <= 99; noun++) {
  if (!done) {
    for (let verb = 0; verb <= 99; verb++) {
      const input = getInput();
      input[1] = noun;
      input[2] = verb;
      const result = getProgramState(input)[0];
      const gAssist = 100 * noun + verb;
      if (result === 19690720) {
        console.log(`noun=${noun}, verb=${verb}, gAssist = ${gAssist}`);
        done = true;
        break;
      }
    }
  }
}