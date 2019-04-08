const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

let orderDB;
let reviewDB;
let userSignUpDB;

app.get('/order/orderDB', (req, res) => {
  console.log("Order get v7");
  orderDB.collection('orders').find().toArray().then(orders => {
    res.json(orders);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });
 
 
 app.post('/order/orderDB', (req, res) => {
  const newOrder = req.body;
  orderDB.collection('orders').insertOne(newOrder).then(result =>
    orderDB.collection('orders').find({ _id: result.insertedId }).limit(1).next()
  ).then(newOrder => {
    res.json(newOrder);
  }).catch(error => {
    //this isnt acttually doing anything rn since we arent validating and non-complete entries can be added to the database
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.get('/review/reviewDB', (req, res) => {
  console.log("Review get v1");
  reviewDB.collection('reviews').find().toArray().then(reviews => {
    res.json(reviews);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.post('/review/reviewDB', (req, res) => {
  const newReview = req.body;
  reviewDB.collection('reviews').insertOne(newReview).then(result =>
    reviewDB.collection('reviews').find({ _id: result.insertedId }).limit(1).next()
  ).then(newReview => {
    res.json(newReview);
  }).catch(error => {
    //this isnt acttually doing anything rn since we arent validating and non-complete entries can be added to the database
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

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