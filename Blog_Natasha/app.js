const express = require('express');
const app = express();
let mysql = require('mysql');
const bodyParser = require('body-parser');
let sqlResult;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// // Connection on server
// let connection = mysql.createConnection({
//   host: 'localhost', 
//   user: 'omarnaod',
//   password: '3yeDroplets!',
//   database: 'omarnaod_blog_natasha_db'
// });

// Connection on my computer
let connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '3yeDroplets!',
  database: 'natasha_blog'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected.....');
})

connection.query("SELECT * FROM blog_posts", function (err, result, fields) {
  if (err) throw err;
  sqlResult = result;
  console.log(sqlResult[0]);
});

app.use(express.static(__dirname + '../..'));

app.get('/', async (req, res) => {
  article2.save(function (err, book) {
    if (err) return console.log(err);
    console.log('"' + book.name + '" saved to collection');
    res.send(article2);
  }); 
  // let article = await Article.find({}, function(err, profile){
  //   res.render('\index.html');
  // });
});

app.post('/new-blog', function(req, res) {
  // var sql = "INSERT INTO blog_posts values(null, '"+ req.body.name +"', '"+req.body.email + "', " + req.body.mobile + ")";
  var sql = `INSERT INTO blog_posts values('${req.body.title}', '${req.body.author}', '${req.body.date}', '${req.body.body}')`;
  
  connection.query("SELECT * FROM blog_posts", function (err, result, fields) {
    sqlResult = result;
    console.log(sqlResult);
  });
  connection.query(sql, function(err) {
    if (err) throw err;
    res.render('new-blog.ejs', {title: 'Data Saved', message: 'Data saved successfully'});
  })
  connection.end();
});

app.get('/new-blog', (req, res) => {
  res.render('new-blog.ejs', {sqlResult: sqlResult});
});

const path = require('path');

app.get('/contracting', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../', 'contracting.html'))
});

app.listen(process.env.PORT || 3000 || 27016 || 27015 || 27017, process.env.IP, function(){
  console.log('Server is running on port 3000');
});