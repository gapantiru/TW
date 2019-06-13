'use strict';

let utils = require('./index');
let url = require('url');
let jwt = require('jsonwebtoken');
let cookies = require('cookies');
let formidable = require('formidable');
let settings = require('../settings');
let fs = require('fs');

let isEmptyObject = function(obj) {
    return !Object.keys(obj).length;
};

exports.get_body_data = function(req, res, next){

    let    body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();
        body = utils.parse(body);

        req.body = body;
        if (body === null) req.body = undefined;

        next();
    });

};

exports.get_form_data = function(req, res, next){

    let form = new formidable.IncomingForm();
    let upload_dir = settings.imgAnnouncementsFullPath + req.user._id;

    if (!fs.existsSync(upload_dir)){
        fs.mkdirSync(upload_dir);
    }

    form.uploadDir = upload_dir;
    // form.uploadDir = settings.imgAnnouncementsFullPath;// + req.user._id;
    form.keepExtensions = true;


    form.parse(req, function(err, fields, files) {
        if(err){
            utils.send_error_json(res, 400, 'Invalid form!');
            return;
        }
        let ann = JSON.parse(fields.announcement);

        //TODO: remove dummy city
        ann.city = 'Iasi';
        //TODO: ASAP

        let images = [];

        for( let key in files){
            let file = files[key];
            images.push(file.path.slice("resources".length));
        }
        if(images.length !== 0)
            ann.images = images;
        req.body = ann;
        next();
    })

};

exports.get_querystring_data = function(req, res, next){

    let query = url.parse(req.url, true).query;
    if(!isEmptyObject(query))
        req.query = query;
    else
        req.query = undefined;
    next();

};

exports.set_user = function(req, res, next){
    /*
    GET USER FROM AUTHORIZATION
     */
    if(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT'
    ){
        jwt.verify(req.headers.authorization.split( ' ')[1], 'RESTFULAPIs', function(err, decode){
            if(err)
                req.user = undefined;
            else
                req.user = decode;
            next();
        })
    }
    /*
    GET USER FROM COOKIE
     */
    else if(
        req.headers &&
        req.headers.cookie
    ){
        let cookies_obj = cookies(req, res);
        let token = cookies_obj.get(session_token_name);
        if(token){
            jwt.verify(token, 'RESTFULAPIs', function(err, decode){
                if(err)
                    req.user = undefined;
                else
                    req.user = decode;
                next();
            })
        }
        else
            next();

    }
    /*
    TOKEN IS NOT IN REQUEST
     */
    else{
        req.user = undefined;
        next();
    }

};

exports.login_required_api = function(req, res, next) {
    if(req.user !== undefined){
        next();
    }
    else{
        utils.send_error_json(res, 401, 'Unauthorized user!');
    }
};

exports.login_required_page = function(req, res, next) {
    if(req.user !== undefined){
        next();
    }
    else{
        next('You must be logged in!');
    }
};