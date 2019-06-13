let view = require('../views/mapView');


class Map{

    static init_routes(router){

        router.get('/map', view.get_map_page);

    }

}

module.exports = Map;