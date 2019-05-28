let mongoose = require('mongoose');
let User     = require('../server/models/user');
let Announcement = require('../server/models/announcement');
let settings     = require('../server/settings');

//---- testing stuff ------

mongoose.connect(settings.mongodb_uri, settings.mongodb_options);

let me = User({
    username: 'oui',
    name: {
        first:'da',
        last: 'nu'
    },
    password: 'dadadad',
    email: 'gpa@ymail.com',
});
// me.my_announcements = undefined;
me.save().then().catch();