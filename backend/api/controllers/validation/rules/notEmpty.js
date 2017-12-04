class NotEmpty {
    
    static checkRule(value, property){
        if(value !== ''){
            return {'error': false};
        }
        return {'error': true, 'message' : [property] + ' needs to be filled'};
    }
}

module.exports = NotEmpty;