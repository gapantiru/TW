let view = require('../views/announcementsView');
let middlewares = require('../utils/middlewares');


class AnnouncementsPage{

    static init_routes(router){

        router.get('/announcements', middlewares.get_querystring_data, view.get_announcements_page);

    }

}

module.exports = AnnouncementsPage;