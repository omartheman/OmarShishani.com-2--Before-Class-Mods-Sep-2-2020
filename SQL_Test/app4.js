let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost', 
  port: '3306',
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

