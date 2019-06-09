let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let Announcements   = require('../models/announcement');
let renderer        = require('../utils/send_rendered_page');

class FirstPageView {


    static get_first_page(req, res, next){

        /*
        SHOULD APPEAR LAST 6 POSTED ANNOUNCEMENTS
         */
        const default_sort = {date : 'desc'};
        const limit_ann_number = 6;

        let items = {announcements: []};

        Announcements.find({})
            .sort(default_sort)
            .limit(limit_ann_number)

            .then( announcements =>{
                announcements.forEach( ann => {
                    items.announcements.push(ann);
                });
                renderer.send(res, 'FirstPage.html', items, next);
            })

            .catch( err =>{
                next(err);
            })


    }

}

module.exports = FirstPageView;