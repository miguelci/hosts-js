const https = require('https');

const url = 'https://www.airbnb.com/rooms/';

const {OK} = require('./../../../status');

class LinkExists {
    static checkRule(value, property, callback){

        https.get(url + value, r => {
            if (r.statusCode === OK){
                return callback({'error': false});
            }
            return callback({'error': true, 'message' : [property] + ' needs to be a valid id'});
        })
        
    }
}

module.exports = LinkExists;