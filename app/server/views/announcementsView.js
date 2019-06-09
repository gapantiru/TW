let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let Announcements   = require('../models/announcement');
let renderer        = require('../utils/send_rendered_page');

class AnnouncementsView{


    static get_announcements_page(req, res, next){

        //redirect to query filters
        if(req.query){
            AnnouncementsView.get_announcements_filtered_page(req, res, next);
            return;
        }

        const default_sort = {date : 'desc'};
        /*
        LOAD ALL ANNOUNCEMENTS
         */
        let items = {announcements:[]};

        Announcements.find({})
            .sort(default_sort)

            .then( announcements => {
                // POPULATE ITEMS
                announcements.forEach( ann => {
                    items.announcements.push(ann);
                });
                renderer.send(res, 'properties.html', items, next);

            })

            .catch( err => {
                //TODO: send to custom err page
                next(err);
            })

    }

    static get_announcements_filtered_page(req, res, next){

        const default_sort = {date : 'desc'};
        /*
        LOAD ANNOUNCEMENTS MATCHING FILTER
         */
        let items = {announcements:[]};

        let filters = req.query;

        Announcements.find(filters)
            .sort(default_sort)
            .then( announcements =>{
                if(announcements){
                    announcements.forEach( ann => {
                        items.announcements.push(ann);
                    });
                }
                renderer.send(res, 'properties.html', items, next);

            })

            .catch( err => {
                next(err);
            })

    }

}

module.exports = AnnouncementsView;

