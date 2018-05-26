VK.init({
    apiId: 6490638
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}

function createFriendsList(list) {
    let temp = document.querySelector('#friend-template').innerHTML;
    let leftContainer = document.querySelector('#left-container');
    let fragment = document.createDocumentFragment();
    let friend = document.createElement('div');

    friend.innerHTML = temp;

    list.forEach((man) => {
        let newFriend = friend.cloneNode(true);
        newFriend.querySelector('.friends__friend-img').style.backgroundImage = `url(${man.photo_100})`;
        newFriend.querySelector('.friends__friend-name').innerText = `${man.last_name} ${man.first_name}`;
        fragment.appendChild(newFriend);
    });
    
    leftContainer.innerHTML = '';
    leftContainer.appendChild(fragment);
}

(async () => {
    try {
        await auth();
        const friends = await callAPI('friends.get', { fields: 'photo_100' });
        console.log(friends.items);
        createFriendsList(friends.items);

    } catch (error) {
        console.log(error);
    }
})();