const Required = require('./rules/required');
const NotEmpty = require('./rules/notEmpty');

const host_required_fields = ['name'];

class HostRules {
    static evaluateRules(object){

        let errors = [];
        host_required_fields.map( required => {
            let rule = Required.checkRule(object, required);
            if(rule.error){
                errors.push(rule.message);
            } else {
                let rule = NotEmpty.checkRule(object[required], required)
                if(rule.error){
                    errors.push(rule.message);
                }
            }
        })
        return errors;
    }

}

module.exports = HostRules;