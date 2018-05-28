function createFriendsList(list, container, tempFriend) {
    let fragment = document.createDocumentFragment();
    let friend = document.createElement('div');

    friend.innerHTML = tempFriend;

    list.forEach((man) => {
        let newFriend = friend.cloneNode(true);

        newFriend.querySelector('.friends__friend-img').style.backgroundImage = `url(${man.photo_100})`;
        newFriend.querySelector('.friends__friend-name').innerText = `${man.last_name} ${man.first_name}`;
        newFriend.querySelector('.friends__friend').dataset.id = man.id;
        newFriend.querySelector('.friends__friend').draggable = true;

        fragment.appendChild(newFriend.querySelector('.friends__friend'));
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}

export {
    createFriendsList
};