function camelize(str) {
  return str
    .split('-')
    .map((value, index) => index === 0 ? value : value[0].toUpperCase() + value.slice(1))
    .join('');
}
