import {createFriendsList} from './createFriendsList';

function isMatching(word, chunk) {
    let regExp = new RegExp(chunk, 'i');

    return regExp.test(word);
}

function friendsFilter(e, friendsList, container, tempFriend) {
    let newFriendsList = [];
    let chunk = e.target.value;

    friendsList.forEach(friend => {
        if (isMatching(friend.first_name, chunk) || isMatching(friend.last_name, chunk)) {
            newFriendsList.push(friend);
        }
    });

    createFriendsList(newFriendsList, container, tempFriend);
}

export {
    friendsFilter
};