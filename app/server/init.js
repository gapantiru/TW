"use strict";

module.exports = function(){

    global.LOG = function (string) {
        console.log(string);
    };

    global.DEBUG = function (string) {
        console.log(string);
    };

    global.getExtension = function (filename) {
        let i = filename.lastIndexOf('.');
        return (i < 0) ? '' : filename.substr(i);
    };

    process.on('SIGTERM', () => {
        LOG("\nClosing server...");
        process.exit(0);
    });

    process.on('SIGINT', () => {
        LOG("\nClosing server...");
        process.exit(0);
    });


    global.MIMEtypes = {
        '.aac': 'audio/aac',
        '.abw': 'application/x-abiword',
        '.arc': 'application/octet-stream',
        '.avi': 'video/x-msvideo',
        '.azw': 'application/vnd.amazon.ebook',
        '.bin': 'application/octet-stream',
        '.bz': 'application/x-bzip',
        '.bz2': 'application/x-bzip2',
        '.csh': 'application/x-csh',
        '.css': 'text/css',
        '.csv': 'text/csv',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.eot': 'application/vnd.ms-fontobject',
        '.epub': 'application/epub+zip',
        '.es': 'application/ecmascript',
        '.gif': 'image/gif',
        '.html': 'text/html',
        '.htm': 'text/html',
        '.ico': 'image/x-icon',
        '.ics': 'text/calendar',
        '.jar': 'application/java-archive',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.mid': 'audio/midi',
        '.midi': 'audio/midi',
        '.mpeg': 'video/mpeg',
        '.mpkg': 'application/vnd.apple.installer+xml',
        '.odp': 'application/vnd.oasis.opendocument.presentation',
        '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
        '.odt': 'application/vnd.oasis.opendocument.text',
        '.oga': 'audio/ogg',
        '.ogv': 'video/ogg',
        '.ogx': 'application/ogg',
        '.otf': 'font/otf',
        '.png': 'image/png',
    };


};