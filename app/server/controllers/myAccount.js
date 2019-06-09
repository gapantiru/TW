let view = require('../views/myAccountView');
let middlewares = require('../utils/middlewares');


class myAccountPage{

    static init_routes(router){

        router.get('/myAccount', middlewares.login_required_page, view.get_my_account);

    }

}

module.exports = myAccountPage;