function hasTwoAdjacentNumbers(n) {
  const str = [...n.toString()];

  let hasTwoAdj = false;

  for (let i = 0; i < str.length; i++) {
    const previous = str[i - 1];
    const current = str[i];
    const next = str[i + 1];
    const nextNext = str[i + 2];

    if (previous !== current && current === next && current !== nextNext) {
      hasTwoAdj = true;
    }
  }

  return hasTwoAdj;
}

function doesNotDecrease(n) {
  const numbers = [...n.toString()].map(s => Number(s));
  const { increases } = numbers.reduce((res, next) => {
    if (res.prev && res.increases) {
      res.increases = res.prev <= next;
    }
    res.prev = next;

    return res;
  }, { increases: true, prev: null });
  return increases;
}

function getInput(from, to) {
  const numbers = [];

  for (var i = from; i <= to; i++) {
    numbers.push(i);
  }
  return numbers;
}

function countValidPasswords() {
  const possible = getInput(136760, 595730);

  const haveAdjacent = possible.reduce((all, n) => {
    if (hasTwoAdjacentNumbers(n)) {
      all.push(n);
    }
    return all;
  }, []);

  const noIncreasing = haveAdjacent.reduce((all, n) => {
    if (doesNotDecrease(n)) {
      all.push(n);
    }
    return all;
  }, []);

  return noIncreasing;
}

console.log(countValidPasswords().length);
