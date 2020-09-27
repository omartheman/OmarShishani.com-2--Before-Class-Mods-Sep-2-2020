let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '3yeDroplets!',
  database: 'omartestdb1'
});


connection.query("SELECT * FROM new_table", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

connection.connect(function(err){
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


