'use strict';

let finalhandler            = require('finalhandler');
let http                    = require('http');
let Router                  = require('router');
let mongoose                = require('mongoose');
let settings                = require('./server/settings');
const UserHandler           = require('./server/controllers/UserController');
const AnnouncementHandler   = require('./server/controllers/AnnouncementController');
let init                    = require('./server/init');
let middlewares             = require('./server/utils/middlewares');
let staticHandler           = require('./server/controllers/staticController');

init();
let router = new Router();
router.use(middlewares.set_user);

UserHandler.init_routes(router);
AnnouncementHandler.init_routes(router);
staticHandler.init_routes(router);

let server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res))
});

mongoose.connect(settings.mongodb_uri, settings.mongodb_options).then(
    () => {
        LOG('Connected to db!..Starting server.');
        server.listen(settings.PORT);
    },
    (err) =>{
        LOG(err);
    }
);