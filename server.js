const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

let orderDB;
let reviewDB;
let userDB;
let deliveryDB;

app.get('/order/orderDB', (req, res) => {
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
  reviewDB.collection('reviews').find().toArray().then(reviews => {
    const metadata = {total_count: reviews.length };
    res.json({_metadata: metadata, records: reviews});
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

 app.get('/users/usersDB', (req, res) => {
  userDB.collection('users').find().toArray().then(users => {
    console.log(users);
    res.json(users);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.post('/users/usersDB', (req, res) => {
  const newUser = req.body;
  userDB.collection('users').insertOne(newUser).then(result =>
    userDB.collection('users').find({ _id: result.insertedId }).limit(1).next()
  ).then(newUser => {
    res.json(newUser);
  }).catch(error => {
    //this isnt acttually doing anything rn since we arent validating and non-complete entries can be added to the database
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });


 app.get('/deliveries/deliverDB', (req, res) => {
  deliveryDB.collection('orders').find().toArray().then(orders => {
    console.log(orders);
    res.json(orders);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.post('/deliveries/deliverDB', (req, res) => {
    const newOrder = req.body;
    console.log(newOrder);
    deliveryDB.collection('orders').insertOne(newOrder).then(result =>
    deliveryDB.collection('orders').find({ _id: result.insertedId }).limit(1).next()
  ).then(newOrder => {
    res.json(newOrder);
  }).catch(error => {
    //this isnt acttually doing anything rn since we arent validating and non-complete entries can be added to the database
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });


MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
    orderDB = connection.db('CS326-DataBase-Orders');
    reviewDB = connection.db('CS326-DataBase-Reviews');
    userDB = connection.db('CS326-DataBase-Users');
    deliveryDB = connection.db('CS326-DataBase-Deliveries');

  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});