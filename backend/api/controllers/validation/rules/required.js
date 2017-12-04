class Required {

    static checkRule(object, property){
        
        if(object[property] !== undefined){
            return {'error': false};
        }
        return {'error': true, 'message' : [property] + ' is required'};
    }
}

module.exports = Required;