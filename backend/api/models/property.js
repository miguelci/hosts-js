const db = require('../db');
const Model = require('./Model');
const Address = require('./Address');

const TABLE = 'properties';

class Property extends Model{

  constructor(id, airbnb_id, bathrooms, bedrooms, income, host_id){
    super();
    this.id = id;
    this.airbnb_id = airbnb_id;
    this.numberOfBathrooms = bathrooms;
    this.numberOfBedrooms = bedrooms;
    this.income = income;
    this.host_id = host_id;
  }

  static findById(params, callback){
    super.find('WHERE host_id = ? and properties.id = ?', params, callback, TABLE);
  }

  static findAllByHostId(host_id, callback){
    super.find('WHERE host_id = ?', [host_id], callback, TABLE);
  }

  static delete(id, callback){
    Model.delete(id, callback, TABLE);
  }

  update(callback){
    Model.update('? WHERE id = ?', [this, this.id], callback, TABLE);
  }

  addPropertyToHost(callback){
    Model.create(this, callback, TABLE);
  }
}

module.exports = Property;
