let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'server255.web-hosting.com', 
  port: '21098',
  user: 'omarnaod_user1',
  password: 'password',
  database: 'omarnaod_articles',
  debug: true
});


connection.connect(function(err){
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});





// const mysql = require('mysql');
// const express = require('express');
// const app = express();
// const PORT = 2082;

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "omarnaod_user_o_man",
//   password: "3yeDroplets!",
//   database: "omarnaod_Webbprogrammering-1"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected!!!!!! =))');
// });

// app.get('/db-test', (req, res, next) => {
//   var id = omarnaod;
//   var sql = `SELECT * FROM users WHERE id NOT IN ('${id}')`;

//   console.log(sql);

//   connection.query(sql, function(err, results, fields) {
//     if (err) console.errorr(err);
//     console.log(`results: ${results}\nfields: ${fields}`);
//   });
// });

// app.listen(PORT);