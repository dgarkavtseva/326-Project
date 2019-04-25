const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

let menuDB;
//let placedOrdersDB;
let reviewsDB;
let usersDB;
//let deliveriesDB;
let ordersDB;

app.get('/api/menuDB', (req, res) => {
  menuDB.collection('items').find().toArray().then(items => {
    res.json(items);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });
 
 
 app.post('/api/menuDB', (req, res) => {
    const newItem = req.body;
    menuDB.collection('items').insertOne(newItem).then(result =>
    menuDB.collection('items').find({ _id: result.insertedId }).limit(1).next()
  ).then(newItems => {
    res.json(newItems);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.get('/api/reviewDB', (req, res) => {
  reviewsDB.collection('reviews').find().toArray().then(reviews => {
    const metadata = {total_count: reviews.length };
    res.json({_metadata: metadata, records: reviews});
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.post('/api/reviewDB', (req, res) => {
  const newReview = req.body;
  reviewsDB.collection('reviews').insertOne(newReview).then(result =>
    reviewsDB.collection('reviews').find({ _id: result.insertedId }).limit(1).next()
  ).then(newReview => {
    res.json(newReview);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.get('/api/usersDB', (req, res) => {
  usersDB.collection('users').find().toArray().then(users => {
    console.log(users);
    res.json(users);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.post('/api/usersDB', (req, res) => {
  const newUser = req.body;
  usersDB.collection('users').insertOne(newUser).then(result =>
    usersDB.collection('users').find({ _id: result.insertedId }).limit(1).next()
  ).then(newUser => {
    res.json(newUser);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });
/*

 app.get('/api/deliverDB', (req, res) => {
  deliveriesDB.collection('deliveries').find().toArray().then(deliveries => {
    console.log(deliveries);
    res.json(deliveries);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });

 app.post('/api/deliverDB', (req, res) => {
    const newDeliveries = req.body;
    console.log(newDeliveries);
    deliveriesDB.collection('deliveries').insertOne(newDeliveries).then(result =>
    deliveriesDB.collection('deliveries').find({ _id: result.insertedId }).limit(1).next()
  ).then(newDeliveries => {
    res.json(newDeliveries);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });



 app.get('/api/orderDB', (req, res) => {
  deliveriesDB.collection('deliveries').find().toArray().then(deliveries => {
    console.log(deliveries);
    res.json(deliveries);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 });


 app.get('/api/placedOrderDB', (req, res) => {
  placedOrdersDB.collection('placedOrders').find().toArray().then(placedOrders => {
    console.log(placedOrders);
    res.json(placedOrders);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
 }); 
 app.post('/api/placedOrderDB', (req, res) => {
    const newPlacedOrders = req.body;
    console.log(newPlacedOrders);
    placedOrdersDB.collection('placedOrders').insertOne(newPlacedOrders).then(result =>
    placedOrdersDB.collection('placedOrders').find({ _id: result.insertedId }).limit(1).next()
  ).then(newPlacedOrders => {
    res.json(newPlacedOrders);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

*/

app.get('/api/ordersDB', (req, res) => {
    ordersDB.collection('orders').find().toArray().then(orders => {
        console.log(orders);
        res.json(orders);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    }); 
});

app.post('/api/ordersDB', (req, res) => {
    const newOrders = req.body;
    console.log(newOrders);
    ordersDB.collection('orders').insertOne(newOrders).then(result =>
        ordersDB.collection('orders').find({ _id: result.insertedId }).limit(1).next()
    ).then(newOrders => {
        res.json(newOrders);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});


MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
    menuDB = connection.db('menuDB');    
    //placedOrdersDB = connection.db('placedOrdersDB');
    reviewsDB = connection.db('reviewsDB');
    usersDB = connection.db('usersDB');
    //deliveriesDB = connection.db('deliveriesDB');
    ordersDB = connection.db('ordersDB');

  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});