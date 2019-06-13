let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let Announcements   = require('../models/announcement');
let Users           = require('../models/user');
let renderer        = require('../utils/send_rendered_page');

class ProfileView{

    static get_user_profile(req, res, next){

        let items = {
            user: {},
            announcements: []
        };

        let userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)){
            next("Invalid user id!");
        }
        userId = mongoose.Types.ObjectId(userId);

        /* FIND USER */
        Users.findById({_id: userId })
            .then( user =>{
                if(user){
                    /* FIND ANNOUNCEMENTS */
                    items.user = user;
                    Announcements.find({seller: userId })
                        .then( anns => {
                            if(anns){
                                anns.forEach( ann => {
                                    items.announcements.push(ann);
                                })
                            }
                            /* RENDER PAGE */
                            renderer.send(res, 'profile.html', items, next);
                        })
                        .catch( err => {
                            next(err);
                        })
                }
                else{
                    next('User not found');
                }
            })
    }

}

module.exports = ProfileView;