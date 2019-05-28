exports.parse = function (obj) {
    let res = null;
    try {
        res = JSON.parse(obj);
    } catch (e) {
        res = null;
    }
    return res;
};

exports.load_body = function (req, res, callback){
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();
        body = parse(body);

        req.body = body;
        if (body === null) req.body = undefined;

        callback(req, res);
    });
};

exports.set_content_json = function (res, status_code) {

    res.writeHead(status_code, {'Content-Type': 'application/json'});

};

exports.send_error_json = function (res, status, message) {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        message : message
    }));
};

exports.send_success_json = function (res, message) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
        message : message
    }));
};

exports.send_json_data = function(res, json_data) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify( json_data ));
};