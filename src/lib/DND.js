import { changeButnsClassList } from './moveFriendFuncs';

function makeDnd(zones, mainContainer) {
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
                putItemToZone(currentDrag.fantom, e.target, currentDrag.overPosition, zone);
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
            
            if (currentDrag.belowItem) {
                currentDrag.belowItem = null;
            }  
        
            if (currentDrag) {
                if (currentDrag.fantom) {
                    destroyElemSlowly(currentDrag.fantom);
                }

                putItemToZone(currentDrag.node, e.target, dropPosition, zone, currentDrag.home);
                currentDrag = null;
            }
        });
    });
}

function createFantomItem() {
    const newDiv = document.createElement('div');
  
    newDiv.classList.add('friends__fantom');
  
    return newDiv;
}
  
function destroyElemSlowly(elem, duration = 10) {
    return new Promise((resolve, reject) => {
        if (!elem) {
            reject();
        }
        let elemHeight = elem.offsetHeight;
        
        function destroyHeight() {
            const currentTime = Date.now();
            const timesLeft = startTime + duration - currentTime;
            
            if (timesLeft <= 0) {
                resolve(elem);
            } else {
                const progress = 1/duration * (duration - timesLeft);
                const nextPoint = elemHeight - elemHeight * progress;
                elem.style.height = nextPoint + 'px';
                requestAnimationFrame(destroyHeight);
            }
        }
      
        const startTime = Date.now();
        requestAnimationFrame(destroyHeight);    
    }).then((elem) => {
            elem.remove();
        },() => {
            console.log('no elem');
        });
}
  
function checkDropItemPosition(targetHeight, dropPointY, parent, ) {
    if (targetHeight / 2 > dropPointY) {
        return 'before';
    } else {
        return 'after';
    }
}
  
function putItemToZone(dragItem, targetItem, position, zone, homeZone) {    
    //console.log(targetItem);
    if (targetItem == zone && !zone.children.lenght) {
        zone.appendChild(dragItem);
    } else if (position === 'before') {
        zone.insertBefore(dragItem, targetItem);
    } else {
        if (targetItem.nextElementSibling) {
            zone.insertBefore(dragItem, targetItem.nextElementSibling);
        } else {
            zone.appendChild(dragItem);
        }       
    }

    if (!dragItem.classList.contains('friends__fantom')) {        

        if (homeZone != zone) {
            let dragItemBtn = dragItem.querySelector('.plusbtn') || dragItem.querySelector('.closebtn');

            changeButnsClassList(dragItemBtn, zone);
        }        
    }
}

export {
    makeDnd
};