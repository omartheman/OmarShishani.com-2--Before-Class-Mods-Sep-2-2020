//README: index5 will create the template for my articles page.  

const express = require('express');
const mongoose = require('mongoose');
const app = express();


let mysql = require('mysql');
let sqlResult;

let connection = mysql.createConnection({
  host: 'localhost', 
  user: 'omarnaod_omar',
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
app.get('/articles2/articles3', (req, res) => {
  res.send("this is articles 3")
})

const path = require('path');

app.get('/contracting', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../', 'contracting.html'))
});

const port = process.env.PORT || 3000 || 27016 || 27015 || 27017; 

app.listen(port, process.env.IP, function(){
  console.log(`Server is running now on port ${port}`);
});