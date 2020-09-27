let mysql = require('mysql');

const mysqlssh = require('mysql-ssh');
const fs = require('fs');
 
mysqlssh.connect(
    {
        host: 'server255.web-hosting.com',
        user: 'omarnaod',
        privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
    },
    {
        host: '127.0.0.1:3306',
        user: 'omarnaod_user1',
        password: '3yeDroplets!',
        database: 'omarnaod_articles'
    }
)
.then(client => {
    client.query('SELECT * FROM `users`', function (err, results, fields) {
        if (err) throw err
        console.log(results);
        mysqlssh.close()
    })
})
.catch(err => {
    console.log(err)
})

// let connection = mysql.createConnection({
//   host: 'localhost', 
//   user: 'root',
//   password: '3yeDroplets!',
//   database: 'omartestdb1'
// });


// connection.connect(function(err){
//   if (err) {
//     return console.error('error: ' + err.message);
//   }

//   console.log('Connected to the MySQL server.');
// });




