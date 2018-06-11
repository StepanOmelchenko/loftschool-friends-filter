import { changeButnsClassList, changeFriendsLists } from './moveFriendFuncs';
import { createFantomItem, destroyElemSlowly } from './view.js';

function makeDnd(zones, mainContainer, friendsStore) {
    let currentDrag;

    mainContainer.addEventListener('dragend', (e) => {
        if (currentDrag) {
            if (currentDrag.fantom) {
                currentDrag.fantom = destroyElemSlowly(currentDrag.fantom);
            }
        }        
    });
  
    zones.forEach(zone => {
        zone.addEventListener('dragstart', (e) => {
            currentDrag = {
                node: e.target,
                overPosition: '',
                lastOverPosition: '',
                fantom: null,
                belowItem: null,
                home: zone
            };
        });
  
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('friends__friend') && e.target != currentDrag.node) {
                let targetHeight = e.target.offsetHeight;
                let dropPointY = e.offsetY;
        
                currentDrag.overPosition = checkDropItemPosition(targetHeight, dropPointY);
                if (currentDrag.overPosition != currentDrag.lastOverPosition) {
                    if (currentDrag.fantom) {
                        currentDrag.fantom = destroyElemSlowly(currentDrag.fantom);
                    }

                    currentDrag.fantom = createFantomItem();            
                    currentDrag.lastOverPosition = currentDrag.overPosition;                    
                    putItemToZone(
                                    currentDrag.fantom,
                                    e.target,
                                    currentDrag.overPosition,
                                    zone,
                                    friendsStore,
                                    currentDrag.belowItem
                                );
                }
            }     
        });
        
        zone.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (e.target == zone) {
                if (currentDrag.fantom) {
                    currentDrag.fantom = destroyElemSlowly(currentDrag.fantom);
                }

                currentDrag.overPosition = null;
                currentDrag.lastOverPosition = null;

                if (currentDrag.belowItem) {
                    currentDrag.belowItem = null;
                }       
            }
            if (e.target.classList.contains('friends__friend') && e.target != currentDrag.node) {
                currentDrag.belowItem = e.target;
            }
        });
    
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            let targetHeight = e.target.offsetHeight;
            let dropPointY = e.offsetY;
            let dropPosition = checkDropItemPosition(targetHeight, dropPointY);
                    
            if (currentDrag) {
                
                putItemToZone(
                                currentDrag.node,
                                e.target,
                                dropPosition,
                                zone,
                                currentDrag.home,
                                friendsStore,
                                currentDrag.belowItem
                            );

                if (currentDrag.fantom) {
                    destroyElemSlowly(currentDrag.fantom);
                }
                currentDrag = null;
            }
        });
    });
}

function checkDropItemPosition(targetHeight, dropPointY/* , parent,  */) {
    if (targetHeight / 2 > dropPointY) {
        return 'before';
    } else {
        return 'after';
    }
}
  
function putItemToZone(dragItem, targetItem, position, zone, homeZone, friendsStore/* , belowItem */) {
    if (targetItem == zone && !zone.children.lenght) {
        zone.appendChild(dragItem);
    } else { 
        if (!targetItem.classList.contains('friends__fantom')) {
            while (!targetItem.classList.contains('friends__friend')) {
                targetItem = targetItem.parentNode;
            }
        } 
        
        if (position === 'before') {
            zone.insertBefore(dragItem, targetItem);
        } else if (targetItem.nextElementSibling && position === 'after') {
            zone.insertBefore(dragItem, targetItem.nextElementSibling);
        } else {
            zone.appendChild(dragItem);
        }
    }

    if (homeZone != zone) {
        let dragItemBtn = dragItem.querySelector('.plusbtn') || dragItem.querySelector('.closebtn');

        if (dragItemBtn) {
            changeButnsClassList(dragItemBtn, zone);
            changeFriendsLists(dragItem, homeZone, zone, friendsStore);
        }     
    }
}

export {
    makeDnd
};