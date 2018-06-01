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
const removeStore = document.querySelector('#remove-store');
const storage = localStorage;

const friendsStore = {
    allFriends: [],
    leftList: [],
    rightList: []
};

document.addEventListener('dragstart', (e) => {
    if (!e.target.classList.contains('friends__friend')) {
        e.preventDefault();
    }
});

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let store = JSON.stringify(friendsStore);

    storage.setItem('friendsStore', store);
});

removeStore.addEventListener('click', (e) => {
    e.preventDefault();
    storage.removeItem('friendsStore');
    window.alert('Локальное хранилище очищено');
});

leftSearchInput.addEventListener('input', (e) => {
    let chunk = e.target.value;

    friendsFilter(chunk, friendsStore.leftList, leftContainer, tempLeftFriend);
});

rightSearchInput.addEventListener('input', (e) => {
    let chunk = e.target.value;

    friendsFilter(chunk, friendsStore.rightList, rightContainer, tempRightFriend);
});



leftContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('friends__friend-btn')) {
        moveFriend(e.target, leftContainer, rightContainer);
    }
}, true);

rightContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('friends__friend-removebtn')) {
        moveFriend(e.target, rightContainer, leftContainer);
    }
}, true);

(async () => {
    try {
        let friends = {};

        if (localStorage.friendsStore) {
            friends = JSON.parse(localStorage.friendsStore);

            friendsStore.allFriends = [...friends.allFriends];
            friendsStore.leftList = [...friends.leftList];
            friendsStore.rightList = [...friends.rightList];
        } else {
            await auth();        
            friends = await callAPI('friends.get', { fields: 'photo_100' });

            friendsStore.allFriends = [...friends.items];
            friendsStore.leftList = [...friends.items];
            friendsStore.rightList = [];
        }        
        console.log(friendsStore);
        await createFriendsList(friendsStore.leftList, leftContainer, tempLeftFriend);
        await createFriendsList(friendsStore.rightList, rightContainer, tempRightFriend);
        await makeDnd([leftContainer, rightContainer], mainContainer, friendsStore);

    } catch (error) {
        console.log(error);
    }
})();

function moveFriend(friendBtn, source, distantion) {
    let friendNode = friendBtn.parentNode;
    
    distantion.appendChild(friendNode);
    changeFriendsLists(friendNode, source, distantion, friendsStore);
    changeButnsClassList(friendBtn, distantion);
}