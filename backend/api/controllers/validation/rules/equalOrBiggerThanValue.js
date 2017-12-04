class EqualOrBiggerThanValue {
    
    static checkRule(assignedValue, value){
        if(assignedValue >= value){
            return {'error': false};
        }
        return {'error': true, 'message' : [property] + ' needs to be bigger or equal than ' + value};
    }
}

module.exports = EqualOrBiggerThanValue;