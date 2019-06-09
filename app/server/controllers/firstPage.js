let view = require('../views/firstPageView');


class firstPage{

    static init_routes(router){

        router.get('/', view.get_first_page);
        router.get('/landing_page', view.get_first_page);

    }

}

module.exports = firstPage;