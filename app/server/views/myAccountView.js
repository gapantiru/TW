let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let Announcements   = require('../models/announcement');
let Users           = require('../models/user');
let renderer        = require('../utils/send_rendered_page');

class MyAccountView{

    static get_my_account(req, res, next){

        let items = {
            user: {},
            announcements: []
        };

        /* FIND USER */
        Users.findById({_id: req.user._id })
            .then( user =>{
                if(user){
                    /* FIND ANNOUNCEMENTS */
                    items.user = user;
                    Announcements.find({seller: user._id })
                        .then( anns => {
                            if(anns){
                                anns.forEach( ann => {
                                    items.announcements.push(ann);
                                })
                            }
                            /* RENDER PAGE */
                            renderer.send(res, 'myAccount.html', items, next);
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

module.exports = MyAccountView;