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
        let items = {
            cities: [],
            announcements:[]};

        Announcements.find({})
            .sort(default_sort)

            .then( announcements => {
                // POPULATE ITEMS
                announcements.forEach( ann => {
                    items.announcements.push(ann);
                });

                Announcements.distinct('city')
                    .then( cities => {
                        if(cities){
                            cities.forEach( city =>{
                                items.cities.push(city);
                            })
                        }
                        renderer.send(res, 'properties.html', items, next);
                    })
                    .catch( err => {
                        next("Internal error!");
                    });

                // renderer.send(res, 'properties.html', items, next);

            })

            .catch( err => {
                //TODO: send to custom err page
                next("Internal error!");
            })

    }

    static get_announcements_filtered_page(req, res, next){

        const default_sort = {date : 'desc'};
        /*
        LOAD ANNOUNCEMENTS MATCHING FILTER
         */
        let items = {
            cities:[],
            announcements:[]};

        let query = req.query;
        let filters = {};

        for (let key in query){
            if(key.includes("apartment") || key.includes("house") || key.includes("land")){
                if(query[key] !== "")
                    filters['specific_data.' + key] = query[key];
            }else{
                filters[key] = query[key];
            }
        }

        // if

        Announcements.find( filters )
            .sort(default_sort)
            .then( announcements =>{
                if(announcements){
                    announcements.forEach( ann => {
                        items.announcements.push(ann);
                    });
                }
                Announcements.distinct('city')
                    .then( cities => {
                        if(cities){
                            cities.forEach( city =>{
                                items.cities.push(city);
                            })
                        }
                        renderer.send(res, 'properties.html', items, next);
                    })
                    .catch( err => {
                        next("Internal error!");
                    });
                // renderer.send(res, 'properties.html', items, next);
            })

            .catch( err => {
                next('Internal error!');
            })

    }

}

module.exports = AnnouncementsView;

