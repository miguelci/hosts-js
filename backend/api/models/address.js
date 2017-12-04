const Model = require('./Model');

const TABLE = 'addresses';

class Address extends Model {

    constructor(id, line_one, line_two, line_three, line_four, post_code, city, country, property_id){
        super();
        this.id = id;
        this.line_one = line_one;
        this.line_two = line_two;
        this.line_three = line_three;
        this.line_four = line_four;
        this.post_code = post_code;
        this.city = city;
        this.country = country;
        this.property_id = property_id;
    }

    static findByPropertyId(property_id, callback){
        super.find('WHERE property_id = ?', [property_id], callback, TABLE);
    }

    addAddressToProperty(callback){
        Model.create(this, callback, TABLE);
    }

    update(callback){
        Model.update('? WHERE id = ?', [this, this.id], callback, TABLE);
    }

    toArray(){
        return [
            this.line_one,this.line_two, this.line_three, this.line_four, this.post_code, this.city, this.country
        ];
    }

}

module.exports = Address;
