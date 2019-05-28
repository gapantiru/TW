'use strict';
let mongoose        = require('mongoose');
let User            = require('../models/user');
let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let bcrypt          = require('bcrypt');
let jwt             = require('jsonwebtoken');


class UserController {

    static getUsers(req, res, next) {
        //check if there is a query string
        if (req.query) {
            User.find(req.query)
                .then(users => {
                    if (users) {
                        utils.set_content_json(res, 200);
                        res.end(JSON.stringify(users));
                    } else {
                        // next("No users in database");
                        utils.send_error_json(res,400, "No users in database");
                    }
                })
                .catch(err => {
                    next(err);
                })

        } else { //should return all
            User.find({})
                .then((users) => {
                    if (users) {
                        utils.set_content_json(res, 200);
                        res.end(JSON.stringify(users));
                    } else {
                        // next("No users in database");
                        utils.send_error_json(res,400, "No users in database");
                    }
                })
                .catch(err => {
                    next(err);
                });
        }
    }

    static getUserById(req, res, next) {
        let userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            // next('Invalid user id!');
            utils.send_error_json(res,400, "Invalid user id!");
        }
        User.findById({_id: mongoose.Types.ObjectId(userId)})
            .then(user => {
                if (user) {
                    utils.set_content_json(res, 200);
                    res.end(JSON.stringify(user));
                } else {
                    // next('User not found');
                    utils.send_error_json(res, 400, "User not found");
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static addUser(req, res, next) {
// utils.load_body(req, res, (req, res) => { //add json object in req.body
        let new_user = new User(req.body);
        new_user.hash_password = bcrypt.hashSync(req.body.password, 10);
        let error = new_user.validateSync();
        if (!error) {
            new_user.save()
                .then(() => {
                    utils.send_success_json(res, "User created!");
                })
                .catch(err => {
                    utils.send_error_json(res, err);
                });
        } else {
            utils.send_error_json(res, error.message);
        }
    }

    static sign_in(req, res, next){

        User.findOne({
            email: req.body.email
        })
            .then( user =>{
                if(user !== undefined){
                    if(!user.comparePassword(req.body.password)){
                        utils.send_error_json(res, 401, "Authentication failed. Wrong password.'");
                    }
                    else{
                        utils.send_json_data(res, {
                        token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')
                        });
                    }
                }
                else{
                    utils.send_error_json( res, 401, 'Authentication failed. User not found.');
                }
            })
            .catch( err =>{
                utils.send_error_json( res, 400, err);
            });

    }


    static init_routes(router){

        router.get('/api/users', middlewares.get_querystring_data ,this.getUsers);
        router.get('/api/users/:id', this.getUserById);

        router.post('/api/users', middlewares.get_body_data, this.addUser);

        router.post('/api/signin', middlewares.get_body_data, this.sign_in);

    }

}

module.exports = UserController;