const Required = require('./rules/required');
const BiggerThanValue = require('./rules/biggerThanValue');
const EqualOrBiggerThanToValue = require('./rules/equalOrBiggerThanValue');
const NotEmpty = require('./rules/notEmpty');

class PropertyRules {
    static evaluateRules(object){

        let errors = [];
             
        let rule = Required.checkRule(object, 'numberOfBathrooms');
        if(rule.error){
            errors.push(rule.message);
        } else {
            rule = NotEmpty.checkRule(object['numberOfBathrooms'], 'numberOfBathrooms')
            if(rule.error){
                errors.push(rule.message);
            } else {
                rule = BiggerThanValue.checkRule(object.numberOfBathrooms, 0, 'numberOfBathrooms')
                if(rule.error){
                    errors.push(rule.message);
                }
            }
        }

        rule = Required.checkRule(object, 'numberOfBedrooms');
        if(rule.error){
            errors.push(rule.message);
        } else {
            rule = NotEmpty.checkRule(object['numberOfBedrooms'], 'numberOfBedrooms')
            if(rule.error){
                errors.push(rule.message);
            } else {
                rule = EqualOrBiggerThanToValue.checkRule(object['numberOfBedrooms'], 0, 'numberOfBedrooms')
                if(rule.error){
                    errors.push(rule.message);
                }
            }   
        }
        
        rule = Required.checkRule(object, 'income');
        if(rule.error){
            errors.push(rule.message);
        } else {
            rule = NotEmpty.checkRule(object['income'], 'income')
            if(rule.error){
                errors.push(rule.message);
            } else {
                rule = BiggerThanValue.checkRule(object.income, 0, 'income')
                if(rule.error){
                    errors.push(rule.message);
                }
            }
        }
        return errors;
    }
}

module.exports = PropertyRules;