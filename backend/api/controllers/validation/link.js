const Required = require('./rules/required');
const BiggerThanValue = require('./rules/biggerThanValue');
const EqualOrBiggerThanToValue = require('./rules/equalOrBiggerThanValue');
const NotEmpty = require('./rules/notEmpty');
const LinkExists = require('./rules/linkExists');

class LinkRules {
    static evaluateRules(object, callback){

        let errors = [];

        let rule = Required.checkRule(object, 'airbnb_id');
        if(rule.error){
            errors.push(rule.message);
            callback(errors);
        } else {
            rule = NotEmpty.checkRule(object['airbnb_id'], 'airbnb_id')
            if(rule.error){
                errors.push(rule.message);
                callback(errors);
            } else {
                LinkExists.checkRule(object.airbnb_id, 'airbnb_id', (rule) => {
                    if(rule.error){
                        errors.push(rule.message);
                    }
                    callback(errors);
                })
            }
        }
    }
}

module.exports = LinkRules;