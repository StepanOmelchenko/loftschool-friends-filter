import {auth, callAPI} from './dataFromVK';
import {friendsFilter} from './searchFunc';
import {createFriendsList} from './createFriendsList';

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
    console.warn('move friend to ', distantion);
    //console.log(distantion.id);
    let friendBox = friendBtn.parentNode;
    //console.log(friendBox);

    
    distantion.appendChild(friendBox);
    changeButnsClassList(friendBtn, distantion);
}

function changeButnsClassList(btn, distantionContainer) {
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

/* function isMatching(word, chunk) {
    let regExp = new RegExp(chunk, 'i');

    return regExp.test(word);
}

function friendsFilter(e, friendsList, container, tempFriend) {
    console.log(e.target.value);
    let newFriendsList = [];
    let chunk = e.target.value;

    friendsList.forEach(friend => {
        if (isMatching(friend.first_name, chunk) || isMatching(friend.last_name, chunk)) {
            newFriendsList.push(friend);
        }
    });

    createFriendsList(newFriendsList, container, tempFriend);
} */

/* function createFriendsList(list, container, tempFriend) {
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
} */