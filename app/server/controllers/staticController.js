let utils           = require('../utils');
let middlewares     = require('../utils/middlewares');
let mongoose        = require('mongoose');
let fs              = require('fs');
let settings        = require('../settings');


class staticController{


    static login_page(req, res, next) {

        fs.readFile(settings.resourcesPath + 'login.html', function(err, data){

            if(err){
                next(err);
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });

    }

    static register_page(req, res, next){

        fs.readFile(settings.resourcesPath + 'signup.html', function(err, data){

            if(err){
                next(err);
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end();
        });

    }

    static get_static_files(req, res, next){

        let path_res = settings.resourcesPath.slice(0, -1) +  req.url;
        if(fs.existsSync(path_res)){
            fs.readFile(path_res, function (err, data) {
                if(err){
                    utils.send_error_json(res, 404, 'Not found');
                    return;
                }
                let mimeType = MIMEtypes[getExtension(path_res)];
                if(mimeType === undefined)
                    mimeType = MIMEtypes[".html"];
                res.writeHead(200, {'Content-Type': mimeType});
                res.write(data);
                res.end();
            })
        }
        else utils.send_error_json(res, 404, 'Not found');

    }

    static init_routes(router){

        router.get('/signup', this.register_page);
        router.get('/login', this.login_page);

        router.get('/css/*', this.get_static_files);
        router.get('/img/*', this.get_static_files);
    }


}

module.exports = staticController;