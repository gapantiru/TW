'use strict';

let finalhandler            = require('finalhandler');
let http                    = require('http');
let mongoose                = require('mongoose');
let settings                = require('./server/settings');
let init                    = require('./server/init');


let mainRouter              = require('./server/routers/mainRouter');

init();

let server = http.createServer(function(req, res) {
    mainRouter(req, res, finalhandler(req, res))
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