VK.init = ({
    apiId: 6490290
});

function auth() {
    console.log('auth');
    return new Promise((resolve, reject) => {
        //console.log(VK.Auth.login);
        VK.Auth.login(data => {
            console.log(data);
            if (data.session) {
                console.log('ok');
                resolve();
            } else {
                console.log('error');
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

auth()
    .then(() => {
        return callAPI('users.get', { name_case: 'gen' });
    })
    .then(me => {
        console.log(me);
    });