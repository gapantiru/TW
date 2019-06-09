let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');
let Announcements   = require('../models/announcement');
let renderer        = require('../utils/send_rendered_page');

class AnnouncementsDetailView{


    static get_announcementsDetail_page(req, res, next){

        let item = {announcement :{}};
        let annId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(annId)){
            next("Invalid announcement id!");
        }

        Announcements.findById({_id: mongoose.Types.ObjectId(annId)})

            .then( ann => {
                if(ann){
                    item.announcement = ann;
                    renderer.send(res, 'properties-detail.html', item, next);
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

