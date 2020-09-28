//README: index5 will create the template for my articles page.  

const express = require('express');
const mongoose = require('mongoose');
const app = express();


let mysql = require('mysql');
let sqlResult;

let connection = mysql.createConnection({
  host: 'localhost', 
  user: 'omarnaod',
  password: '3yeDroplets!',
  database: 'omarnaod_articles'
});


connection.query("SELECT * FROM Accounts", function (err, result, fields) {
  if (err) throw err;
  sqlResult = result;
  console.log(sqlResult);
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

app.get('/articles2', (req, res) => {
  res.send(sqlResult);
  // res.send(sqlResult);
  // let article = Article.find({}, function(err, articles){
  //   res.send('articles2.ejs', sqlResult);
  //   res.render('articles2.ejs', {articles: articles});
  // });
});

// app.listen(3000, () => { 
//   console.log('Server is listening on port 3000') 
// });

const path = require('path');

app.get('/contracting', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../', 'contracting.html'))
});

app.listen(process.env.PORT || 3000 || 27016 || 27015 || 27017, process.env.IP, function(){
  console.log('Server is running on port 3000');
});