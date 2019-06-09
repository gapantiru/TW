'use strict';
let mongoose        = require('mongoose');
let User            = require('../models/user');
let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let bcrypt          = require('bcrypt');
let dependencies    = require('../utils/dependencies');


class UserAPI {

    static getUsers(req, res, next) {
        //check if there is a query string
        if (req.query) {
            User.find(req.query)
                .then(users => {
                    if (users) {
                        utils.set_content_json(res, 200);
                        res.end(JSON.stringify(users));
                    } else {
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
                    utils.send_error_json(res, 400, "User not found");
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static addUser(req, res, next) {
        let new_user = new User(req.body);
        new_user.hash_password = bcrypt.hashSync(req.body.password, 10);
        let error = new_user.validateSync();
        if (!error) {
            new_user.save()
                .then(() => {
                    utils.send_success_json(res, "User created!");
                })
                .catch(err => {
                    utils.send_error_json(res, 400, err.message);
                });
        } else {
            utils.send_error_json(res, 400, error._message);
            // utils.send_model_error(res, 401, error.errors);
        }
    }

    static deleteUser(req, res, next){

        let userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)){
            utils.send_error_json(res, "Invalid user id!");
        }
        userId =  mongoose.Types.ObjectId(userId);
        User.findOne({_id: userId})
            .then( user =>{
                if(user) {
                    dependencies.remove_user_announcements(userId, function (err) {
                        if (err) {
                            utils.send_error_json(res, 400, "Failed removing user announcements!");
                        } else {
                            user.remove(err => {
                                if (err) {
                                    utils.send_error_json(res, 400, "Failed removing user!");
                                } else {
                                    LOG('send response');
                                    utils.send_success_json(res, "User removed!");
                                }

                            });
                        }
                    })
                }
                else{
                    utils.send_error_json(res, 400, "User not found!");
                }
            })
            .catch( err =>{
                utils.send_error_json(res, 500,"Failed removing user!");
            });

    }

    static updateUser(req, res, next){

        let userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)){
            utils.send_error_json(res, 400,"Invalid user id!");
        }
        userId =  mongoose.Types.ObjectId(userId);
        User.findOne({_id: userId})
            .then( user => {
                return Object.assign(user, req.body);
            })
            .then((model) => {
            return model.save();
            })
            .then((updatedModel) => {
                utils.send_success_json(res, 'User Updated!')
            }).catch((err) => {
                utils.send_error_json(res, 500, err);
            });

    }


    static init_routes(router){

        router.get('/api/users', middlewares.get_querystring_data ,this.getUsers);
        router.get('/api/users/:id', this.getUserById);

        router.post('/api/users', middlewares.get_body_data, this.addUser);

        router.delete('/api/users/:id', this.deleteUser);

        router.put('/api/users/:id', middlewares.get_body_data, this.updateUser);

    }

}

module.exports = UserAPI;