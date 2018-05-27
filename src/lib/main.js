import {auth, callAPI} from './dataFromVK';

const leftSearchInput = document.querySelector('#left-search');
const rightSearchInput = document.querySelector('#right-search');
const leftContainer = document.querySelector('#left-container');
const rightContainer = document.querySelector('#right-container');
const tempLeftFriend = document.querySelector('#friend-template').innerHTML;
const tempRightFriend = document.querySelector('#friend-moved-template').innerHTML;
const friendsStore = {
    allFriends: [],
    leftList: [],
    rightList: []
};

(async () => {
    try {
        await auth();
        const friends = await callAPI('friends.get', { fields: 'photo_100' });
        console.log(friends.items);
        friendsStore.allFriends = friends.items;
        friendsStore.leftList = friends.items;
        createFriendsList(friendsStore.leftList, leftContainer, tempLeftFriend);

    } catch (error) {
        console.log(error);
    }
})();

leftSearchInput.addEventListener('input', friendsFilter);

function isMatching(word, chunk) {
    let regExp = new RegExp(chunk, 'i');

    return regExp.test(word);
}

function friendsFilter(e, friendsList, chunk) {
    console.log(e.target.value);
}

function createFriendsList(list, container, tempFriend) {
    let fragment = document.createDocumentFragment();
    let friend = document.createElement('div');

    friend.innerHTML = tempFriend;

    list.forEach((man) => {
        let newFriend = friend.cloneNode(true);
        newFriend.querySelector('.friends__friend-img').style.backgroundImage = `url(${man.photo_100})`;
        newFriend.querySelector('.friends__friend-name').innerText = `${man.last_name} ${man.first_name}`;
        fragment.appendChild(newFriend);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}