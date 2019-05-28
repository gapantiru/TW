'use strict';

let mongoose    = require('mongoose');
let validator   = require('validator');
let bcrypt      = require('bcrypt');
let Schema      = mongoose.Schema;

let user_schema = {
    username: {
        type: String,
        unique: [true, "username must be unique!"]
    },
    name: {
        first: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        last: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        }
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    hash_password: {
        type: String,
        required: [true, 'password is required'],
        hidden: true
    },
    my_announcements: {
        type: mongoose.ObjectId,
        ref: 'Announcement'
    },
    saved_announcements: {
        type: mongoose.ObjectId,
        ref: 'Announcement'
    },
    joined :{
        type: Date,
        required: true,
        default: new Date()
    }
};

let UserSchema = new mongoose.Schema(user_schema);

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
};

UserSchema.virtual('fullName')
    .get(function() { return this.name.first + ' ' + this.name.last; })
    .set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
});

// exports.user_schema = user_schema;
module.exports = mongoose.model('User', UserSchema);