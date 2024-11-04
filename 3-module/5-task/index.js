function getMinMax(str) {
  let numbers = str
    .split(' ')
    .map(value => Number(value))
    .filter(value => Number.isFinite(value));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}
