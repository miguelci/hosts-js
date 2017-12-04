const address_required_fields = ['line_one', 'line_four', 'post_code', 'city', 'country'];

const Required = require('./rules/required');
const NotEmpty = require('./rules/notEmpty');

class AddressRules {
    static evaluateRules(object){
        let errors = [];
        
        address_required_fields.map( required => {
            let rule = Required.checkRule(object, required);
            if(rule.error){
                errors.push(rule.message);
            } else {
                let rule = NotEmpty.checkRule(object[required], required)
                if(rule.error){
                    errors.push(rule.message);
                }
            }
        });
        return errors;
    }

}

module.exports = AddressRules;