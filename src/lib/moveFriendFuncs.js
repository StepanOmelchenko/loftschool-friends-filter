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
        putElemToTheEndOfArray(friend, friendsStore.leftList, friendsStore.rightList);
    } else if (distantionContainer.id == 'left-container') {        
        putElemToTheEndOfArray(friend, friendsStore.rightList, friendsStore.leftList);
    }    
}

function putElemToTheEndOfArray(friendElem, sourceList, distationList) {
    let friendElemId = friendElem.dataset.id;
    let friend = sourceList.find(hasElementId);
    let friendElemPosition = sourceList.indexOf(friend);
    /* let friendElemPosition = findElemPositionInArray(friendElem, sourceList);        
    let friend = sourceList.splice(friendElemPosition, 1); */
    
    /* if (!friend[0]) {
        console.warn('putElemToTheEndOfArray: no elem ', friend)
    } else { */
        friend = sourceList.splice(friendElemPosition, 1);
        distationList.push(friend[0]);

        console.log(distationList);
   /*  } */        

    function hasElementId(elem) {
        return elem.id == friendElemId;
    }
}

/* function findElemPositionInArray(elemNode, array) {
    let elemNodeId = elemNode.dataset.id;
    let elem = array.find((item, elemNodeId) => {
        if (!item) { // lost array
            console.warn('findElemPositionInArray: array lost ', array);

            return false;
        }

        return item.id == elemNodeId;
    });

    return array.indexOf(elem);
} */

export {
    changeButnsClassList,
    changeFriendsLists
};