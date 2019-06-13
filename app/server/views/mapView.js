let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let renderer        = require('../utils/send_rendered_page');

class MapView {


    static get_map_page(req, res, next){

        let items = {};
        renderer.send(res, 'modalGlobalMap.html', items, next);

    }

}

module.exports = MapView;