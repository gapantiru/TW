let view = require('../views/profileView');
let middlewares = require('../utils/middlewares');


class profilePage{

    static init_routes(router){

        router.get('/profile/:id', view.get_user_profile);

    }

}

module.exports = profilePage;