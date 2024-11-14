function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  friends.forEach(({firstName, lastName}) => {
    ul.insertAdjacentHTML('beforeend', `<li>${firstName} ${lastName}</li>`);
  });

  return ul;
}
