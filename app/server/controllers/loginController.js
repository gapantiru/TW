'use strict';
let mongoose        = require('mongoose');
let User            = require('../models/user');
let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let bcrypt          = require('bcrypt');
let jwt             = require('jsonwebtoken');
let dependencies    = require('../utils/dependencies');

class LoginController {

    static login(req, res, next) {

        if (req.body === undefined) {
            utils.send_error_json(res, 400, "no data provided!");
        }

        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    if (!user.comparePassword(req.body.password)) {
                        utils.send_error_json(res, 400, "Wrong password.");
                    } else {

                        utils.set_cookie_token(req, res, 200, {
                            token: jwt.sign({email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')
                        });

                    }
                } else {
                    utils.send_error_json(res, 400, 'User not found.');
                }
            })
            .catch(err => {
                utils.send_error_json(res, 500, err);
            });

    }

    static init_routes(router){

        router.post('/api/login', middlewares.get_body_data, this.login);

    }
}

module.exports = LoginController;