const fantomDiv = document.createElement('div');
 
fantomDiv.classList.add('friends__fantom');

function createFantomItem() {
    fantomDiv.style.height = '60px';
  
    return fantomDiv;
}

function destroyElemSlowly(elem) {    
    if (elem) {
        elem.style.height = 0;    
    }
}

export {
    createFantomItem,
    destroyElemSlowly
};