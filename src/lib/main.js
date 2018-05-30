import { auth, callAPI } from './dataFromVK';
import { friendsFilter } from './searchFunc';
import { createFriendsList } from './createFriendsList';
import { changeButnsClassList, changeFriendsLists } from './moveFriendFuncs';
import { makeDnd } from './DND';

const mainContainer = document.querySelector('#friends_main');
const leftSearchInput = document.querySelector('#left-search');
const rightSearchInput = document.querySelector('#right-search');
const leftContainer = document.querySelector('#left-container');
const rightContainer = document.querySelector('#right-container');
const tempLeftFriend = document.querySelector('#friend-template').innerHTML;
const tempRightFriend = document.querySelector('#friend-moved-template').innerHTML;
const saveBtn = document.querySelector('#save-btn');
const storage = localStorage;

const friendsStore = {
    allFriends: [],
    leftList: [],
    rightList: []
};

saveBtn.addEventListener('click', (e) => {
    let store = JSON.stringify(friendsStore);

    storage.setItem('friendsStore', store);
    console.log(JSON.parse(localStorage.friendsStore));
});

leftSearchInput.addEventListener('input', (e) => {
    friendsFilter(e, friendsStore.leftList, leftContainer, tempLeftFriend);
});

rightSearchInput.addEventListener('input', (e) => {
    friendsFilter(e, friendsStore.rightList, rightContainer, tempRightFriend);
});

leftContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('friends__friend-btn')) {
        moveFriend(e.target, leftContainer, rightContainer);
    }
}, true);

rightContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('friends__friend-removebtn')) {
        moveFriend(e.target, rightContainer, leftContainer);
    }
}, true);

(async () => {
    try {
        await auth();
        const friends = await callAPI('friends.get', { fields: 'photo_100' });
        //console.log(friends.items);
        friendsStore.allFriends = friends.items;
        friendsStore.leftList = friends.items;

        await createFriendsList(friendsStore.leftList, leftContainer, tempLeftFriend);
        await makeDnd([leftContainer, rightContainer], mainContainer, friendsStore);

    } catch (error) {
        console.log(error);
    }
})();

function moveFriend(friendBtn, source, distantion) {
    let friendBox = friendBtn.parentNode;
    
    distantion.appendChild(friendBox);
    changeFriendsLists(friendBox, source, distantion, friendsStore);
    changeButnsClassList(friendBtn, distantion);
}