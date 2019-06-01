'use strict';
let mongoose        = require('mongoose');
let Announcement    = require('../models/announcement');
let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');

class AnnouncementController{

    static getAnnouncements(req, res, next){

        if (req.query) {
            Announcement.find(req.query)
                .then(announcements => {
                    if (announcements) {
                        utils.set_content_json(res, 200);
                        res.end(JSON.stringify(announcements));
                    } else {
                        utils.send_error_json(res, 400, "No announcements in database");
                    }
                })
                .catch(err => {
                    next(err);
                })
        }
        else
            {
                Announcement.find({})
                    .then(announcements => {
                        if (announcements) {
                            utils.set_content_json(res, 200);
                            res.end(JSON.stringify(announcements));
                        } else {
                            utils.send_error_json(res, "No announcements in database");
                        }
                    })
                    .catch(err => {
                        next(err);
                    })
            }

    }

    static getMarkers(req, res, next){

        Announcement.find({})
            .then(announcements => {
                if(announcements){
                    utils.set_content_json(res, 200);

                    const markers = [];
                    announcements.forEach(element => {
                        const marker = {};
                        if(element.coordinates) {
                            marker.coordinates = element.coordinates;
                        }
                        if(element.address) {
                            marker.address = element.address;
                        }
                        if(element.description) {
                            marker.description = element.description;
                        }

                        markers.push(marker);
                    });

                    res.end(JSON.stringify(markers));
                }
                else{
                    utils.send_error_json(res, "No announcements in database");
                }
            })
            .catch( err => {
                next(err);
            })

    }

    static getAnnouncementById(req, res, next){
        let annId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(annId)){
            utils.send_error_json(res, "Invalid announcement id!");
        }
        Announcement.findById({_id: mongoose.Types.ObjectId(annId)})
            .then( announcement =>{
                if(announcement){
                    utils.set_content_json(res, 200);
                    res.end(JSON.stringify(announcement));
                }
                else{
                    utils.send_error_json(res, "Announcement not found");
                }
            })
            .catch(err =>{
                next(err);
            })
    }

    static addAnnouncement(req, res, next) {
        let new_ann = Announcement(req.body);
        new_ann.seller = req.user._id;
        let error = new_ann.validateSync();
        if (!error) {
            new_ann.save()
                .then(() => {
                    utils.send_success_json(res, "Announcement created!");
                })
                .catch(err => {
                    utils.send_error_json(res, err);
                });
        } else {
            utils.send_error_json(res, error.message);
        }
    }

    static init_routes(router) {

        router.get('/api/announcements', middlewares.get_querystring_data,this.getAnnouncements);
        router.get('/api/markers', middlewares.get_querystring_data,this.getMarkers);
        router.get('/api/announcements/:id', this.getAnnouncementById);

        router.post('/api/announcements' , middlewares.login_required, middlewares.get_body_data, this.addAnnouncement);

    }


}

module.exports = AnnouncementController;