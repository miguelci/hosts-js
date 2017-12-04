class BiggerThanValue {
    
    static checkRule(assignedValue, value, property){
        if(assignedValue > value){
            return {'error': false};
        }
        return {'error': true, 'message' : [property] + ' needs to be bigger than ' + value};
    }
}

module.exports = BiggerThanValue;