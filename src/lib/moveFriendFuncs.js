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
}

export {
    changeButnsClassList,
    changeFriendsLists
};