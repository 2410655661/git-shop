let mysql = require('mysql');
let dataConfig = require('../config/config');

module.exports = {
  query: (sql, params, callback) => {
    let connection = mysql.createConnection(dataConfig);
    connection.connect((err) => {
      console.log('数据库链接失败');
      return;
    });
    connection.query(sql, params, (err, results, fields) => {
      if(err) {
        console.log('数据查询失败');
        return;
      }
      callback && callback(results, fields);
      connection.end((err) => {
        if(err) {
          console.log('关闭数据库链接失败');
          return;
        }
        console.log('关闭数据库链接成功')
      })
    })
  }
}