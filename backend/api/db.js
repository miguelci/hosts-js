const mysql = require('mysql');

const connection = getConnection();

exports.getData = (sql, params = [], callback) => {
  connection.query(sql, params, function(err, rows, fields){
      if(rows && rows.length !== 0){
        return callback ({'error': false, 'data': rows});
      }else{
        if(rows && rows.length === 0)
          return callback ({'error': false, 'data': []});
        return callback ({'error': true, 'data': err.message});
      }
  });
}

exports.getDataWithQuery = (sql, callback) => {
  connection.query(sql, [], function(err, rows, fields){
      if(rows && rows.length !== 0){
        return callback ({'error': false, 'data': rows});
      }else{
        if(rows && rows.length === 0)
          return callback ({'error': false, 'data': []});
        return callback ({'error': true, 'data': err.message});
      }
  });
}

exports.insertData = (sql, params, callback) => {
  connection.query(sql, params, function (err, results, fields) {
    if (err) {
      callback({'error': true, err});
    } else {
      callback({'error': false, id: results.insertId});
    }
  });
}

exports.changeData = (sql, params, callback) => {
  connection.query(sql, params, function (err, results, fields) {
    if (err) {
      callback({'error': true, err});
    } else {
      callback({'error': false, rows: results.affectedRows});
    }
  });
}

function getConnection(){
  return mysql.createConnection({
       host : 'mysql.dev',
       user : 'root',
       password : '',
       database : 'hostmaker',
   })
}
