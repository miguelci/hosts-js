const db = require('../db');

class Model {
  static find(where = '', params = [], callback = {}, table){
    db.getData(`SELECT * from ${table} ${where}`, params, (result) => {
      if(!result.error){
        let objects = result.data.map(r => {
          return {...r}
        })
        return callback({[table]: objects})
      }
      return callback({'error': result.data})
    });
  }

  static findWithQuery(query, callback = {}, table){
    db.getDataWithQuery(query, (result) => {
      if(!result.error){
        let objects = result.data.map(r => {
          return {...r}
        })
        return callback({[table]: objects})
      }
      return callback({'error': result.data})
    });
  }

  static create(params, callback, table){
    let sql = `INSERT INTO ${table} SET ?`;

    db.insertData(sql, params, result => {
      if(result.err){
        return callback({'error': true, 'message': result.err.message});
      }
      return callback({'id': result.id});
    })
  }

  static delete(id, callback, table){
    let sql = `DELETE FROM ${table} WHERE id = ?`,
      params = [id];
    db.changeData(sql, params, (result) => {
      if(result.err){
        return callback({'error': true, 'message': result.err.message});
      }
      return callback({'rows': result.rows});
    })
  }

  static update(fields, params, callback, table){
    let sql = `UPDATE ${table} SET ${fields}`;
    db.changeData(sql, params, (result) => {
      if(result.err){
        return callback({'error': true, 'message': result.err.message});
      }
      return callback({'rows': result.rows});
    })
  }
}

module.exports = Model;
