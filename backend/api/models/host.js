const db = require('../db');
const Model = require('./Model');
const Property = require('./Property');

const TABLE = 'hosts';

class Host extends Model {

  constructor(id, name){
    super();
    this.id = id;
    this.name = name;
  }

  static find(id = null, callback){
    let where = '', params = [];
    if(id) {
      where = 'WHERE id = ?';
      params.push(id);
    }
    super.find(where, params, callback, TABLE);
  }

  static create(name, callback){
    Model.create({name}, callback, TABLE);
  }

  static delete(id, callback){
    Model.delete(id, callback, TABLE);
  }

  static update(host, callback){
    Model.update('name = ? WHERE id = ?', [host.name, host.id], callback, TABLE);
  }

  static dashboard(callback){
    super.findWithQuery(`SELECT h.id, h.name, count(p.id) properties, sum(p.income) income 
            FROM hosts h
            LEFT JOIN properties p
            on h.id = p.host_id
            GROUP BY h.id`, callback, 'dashboard');
  }

  properties(callback){
    Property.findAllByHostId([this.id], callback);    
  }

  property(id, callback){
    Property.findById([this.id, id], callback);    
  }

  addProperty(property, callback){
    Property.addPropertyToHost(this.id, property, callback);    
  }
}

module.exports = Host;
