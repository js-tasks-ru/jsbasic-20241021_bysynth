function showSalary(users, age) {
  return users
    .filter(({age: userAge}) => userAge <= age)
    .map(({name, balance}) => `${name}, ${balance}`)
    .join('\n');
}
