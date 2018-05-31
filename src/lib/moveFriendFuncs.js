import { friendsFilter } from './searchFunc';

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

function changeFriendsLists(friend, sourceContainer, distantionContainer, friendsStore) {
    let tempLeftFriend = document.querySelector('#friend-template').innerHTML;
    let tempRightFriend = document.querySelector('#friend-moved-template').innerHTML;
    let leftInputValue = document.querySelector('#left-search').value;
    let rightInputValue = document.querySelector('#right-search').value;

    if (distantionContainer.id == 'right-container') {
        putElemToTheEndOfArray(
                                friend,
                                friendsStore.leftList,
                                friendsStore.rightList,
                                tempRightFriend,
                                rightInputValue,
                                distantionContainer
                            );
    } else if (distantionContainer.id == 'left-container') {        
        putElemToTheEndOfArray(
                                friend,
                                friendsStore.rightList,
                                friendsStore.leftList,
                                tempLeftFriend,
                                leftInputValue,
                                distantionContainer
                            );
    }    
}

function putElemToTheEndOfArray(friendElem, sourceList, distationList, tempFriend, chunk, container) {
    let friendElemId = friendElem.dataset.id;
    let friend = sourceList.find(hasElementId);
    let friendElemPosition = sourceList.indexOf(friend);

    friend = sourceList.splice(friendElemPosition, 1);
    distationList.push(friend[0]);

    if (chunk) {
        console.log('rebuild search');
        friendsFilter(chunk, distationList, container, tempFriend);
    }    

    function hasElementId(elem) {
        return elem.id == friendElemId;
    }
}

export {
    changeButnsClassList,
    changeFriendsLists
};