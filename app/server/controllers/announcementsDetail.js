let view = require('../views/announcementsDetailView');
let middlewares = require('../utils/middlewares');

class AnnouncementsDetailPage{

    static init_routes(router){

        router.get('/announcementsDetail/:id', middlewares.get_querystring_data, view.get_announcementsDetail_page);

    }

}

module.exports = AnnouncementsDetailPage;