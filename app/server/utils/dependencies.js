'use strict';

let User = require('../models/user');
let Announcement = require('../models/announcement');

/*
    Used when an user is deleted => removes all of his announcements
 */
exports.remove_user_announcements = function(user_id, callback) {
    Announcement.find({seller: user_id})
        .then( anns =>{
            anns.forEach(function(ann){
                ann.remove( err =>{
                    if(!err){
                        LOG('Removed announcement!');
                    }
                    else{
                        LOG('Failed removing ann!');
                        callback(err);
                    }
                })
            });
            callback();
        })
        .catch( err =>{
            LOG('error deleting announcement');
            callback(err);
        });
};

/*
    Used when an announcement is removed => remove it from user's list
 */
exports.remove_announcement_from_user = function(user_id, ann_id, callback){

    User.update(
        {_id : user_id},
        {$pull: {my_announcements: ann_id}},
        function(err){
            if(err){
                LOG(err);
                callback(err);
            }else{
                LOG("Successfully removed");
                callback();
            }
        }
    );

};

/*
    Used when an announcement is added => add it in user's list
 */
exports.add_user_announcement = function(user_id, ann_id, callback){

    User.update(
        { _id: user_id},
        {$addToSet: {my_announcements: ann_id}},
        function(err){
            if(err){
                LOG(err);
                callback(err);
            }else{
                LOG("Successfully added");
                callback();
            }
        });

};