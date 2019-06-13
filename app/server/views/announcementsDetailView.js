let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let Announcements   = require('../models/announcement');
let Users           = require('../models/user');
let renderer        = require('../utils/send_rendered_page');

class AnnouncementsDetailView{


    static get_announcementsDetail_page(req, res, next){

        let item = {
            user: {},
            announcement: {}
        };
        let annId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(annId)){
            next("Invalid announcement id!");
        }

        Announcements.findById({_id: mongoose.Types.ObjectId(annId)})

            .then( ann => {
                if(ann){
                    item.announcement = ann;
                    /* GET SELLER */
                    Users.findById({ _id: ann.seller})
                        .then( user => {
                            if (user){
                                item.user = user;
                                renderer.send(res, 'properties-detail.html', item, next);
                            }
                            else{
                                next("Seller not found!");
                            }
                        })
                        .catch( err =>{
                            next("Internal error!");
                        });
                }
                else{
                    next("Announcement not found");
                }
            })

            .catch(err =>{
                next(err);
            })

    }

}

module.exports = AnnouncementsDetailView;

