const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
app.get('/order/orderDB', (req, res) => {
  console.log("order request 3");
//    res.json = {test:"hello"};
   const metadata = { total_count: 5 };
   res.json({ _metadata: metadata, records: "yah" });
 });


let orderDB;
let reviewDB;
let userSignUpDB;

MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
    orderDB = connection.db('CS326-DataBase-Orders');
    reviewDB = connection.db('CS326-DataBase-Reviews');
    userSignUpDB = connection.db('CS326-Users');

  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});