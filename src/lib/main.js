import { auth, callAPI } from './dataFromVK';
import { friendsFilter } from './searchFunc';
import { createFriendsList } from './createFriendsList';
import { changeButnsClassList, changeFriendsLists } from './moveFriendFuncs';

const mainContainer = document.querySelector('#friends_main');
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
        console.log(friends.items);
        friendsStore.allFriends = friends.items;
        friendsStore.leftList = friends.items;
        createFriendsList(friendsStore.leftList, leftContainer, tempLeftFriend);

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

/* function changeButnsClassList(btn, distantionContainer) {
    if (distantionContainer.id == 'right-container') {
        btn.classList.remove('friends__friend-btn');
        btn.classList.remove('plusbtn');
        btn.classList.add('friends__friend-removebtn');
        btn.classList.add('closebtn');
    } else if (distantionContainer.id == 'left-container') {        
        btn.classList.remove('friends__friend-removebtn');
        btn.classList.remove('closebtn');
        btn.classList.add('friends__friend-btn');
        btn.classList.add('plusbtn');
    }
}

function changeFriendsLists(friend, sourceContainer, distantionContainer, friendsStore) {
    if (distantionContainer.id == 'right-container') {
        spliceElem(friend, friendsStore.leftList, friendsStore.rightList);
    } else if (distantionContainer.id == 'left-container') {        
        spliceElem(friend, friendsStore.rightList, friendsStore.leftList);
    }

    function spliceElem(friendElem, sourceList, distationList) {
        let friendElemId = friendElem.dataset.id;
        let friend = sourceList.find(hasElementId);
        let friendElemPosition = sourceList.indexOf(friend);
        
        friend = sourceList.splice(friendElemPosition, 1);
        distationList.push(friend[0]);

        function hasElementId(elem) {
            return elem.id == friendElemId
        }
    }
} */