const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()

let db = require('./methods/mysql')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login', (req,res) => {
  const name = req.body.name;
  const password = req.body.password;
  const sql = 'SELECT * FROM login WHERE name = ? AND password = ?';
  db.query(sql, [name, password], (result, fields) => {
    if(result.length == 0) {
      res.send('false');
    } else {
      const str = JSON.stringify(result)
      res.send(str);
    }
  })
});

app.post('/register', (req, res) => {
  const { name, password } = req.body;
  const sql = 'SELECT * FROM login WHERE name = ?';
  db.query(sql, [name], (result, fields) => {
    if(result.length > 0) {
      res.send('用户名已存在')
    } else {
      const insert = 'INSERT INTO login(name, password, type) VALUES (?, ?, ?)'
      db.query(insert, [name, password, 'user'], (result, fields) => {
        res.send('insert success')
      })
    }
  })
})

app.get('/search', (req, res) => {
  const searchKey = req.query.searchObj;
  console.log(searchKey.searchObj)
  const sql = `SELECT 
    goods.bookName, 
    goods.bookAuthor, 
    goods.bookDescript, 
    CAST(goods.bookPrice AS DECIMAL(20, 2)) AS bookPrice, 
    CAST(goods.activityBookPrice AS DECIMAL(20, 2)) AS activityBookPrice, 
    goods.bookPriceUnit, 
    goods.bookClassName, 
    goods.bookTypeName 
  FROM goods WHERE CONCAT(bookName, bookAuthor, bookDescript) LIKE "%${searchKey}%"`;
  db.query(sql, [], (result, fields) => {
    if(result.length == 0) {
      res.send('false');
    } else {
      const str = JSON.stringify(result)
      res.send(str);
    }
  })
})

app.listen(3000, () => {
  console.log('Server running at 3000 port')
})