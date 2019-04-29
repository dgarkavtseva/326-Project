const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

let menuDB;
let reviewsDB;
let usersDB;
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
    //console.log(users);
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


app.get('/api/ordersDB', (req, res) => {
    ordersDB.collection('orders').find().toArray().then(orders => {
        //console.log(orders);
        res.json(orders);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    }); 
});

app.post('/api/ordersDB', (req, res) => {
    const newOrders = req.body;
    //console.log(newOrders);
    ordersDB.collection('orders').insertOne(newOrders).then(result =>
        ordersDB.collection('orders').find({ _id: result.insertedId }).limit(1).next()
    ).then(newOrders => {
        res.json(newOrders);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.put('/api/ordersDB', (req, res) => {
    const newOrders = req.body;
    let query = { orderID: newOrders.orderID, status: "Pending" };
    let newValues = { $set: { driver: newOrders.driver, status: "Accepted" } };
    ordersDB.collection("orders").updateOne(query, newValues, {}).then(result =>
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
    reviewsDB = connection.db('reviewsDB');
    usersDB = connection.db('usersDB');
    ordersDB = connection.db('ordersDB');

  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});



/////////////

'use strict';

const fs = require('fs');
const mime = require('mime-types')
const webPush = require('web-push');

let subscriptions = []
process.env.VAPID_PUBLIC_KEY = 'BFZKyyvTLK6kbEHCBQeg5TJr6dw-1SRaWu4TC5t6z9C0vetA1yzeWSYCj71gBZbw5kCREAa-fGwh6RwJ2akU7VA';
process.env.VAPID_PRIVATE_KEY = '0XzeoOURNZWcnzfH_375xkR4bmp3ylvQB0mtdpvQFrE';

const options = {
  vapidDetails: {
    subject: 'foo@bar.de',
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
  },
};

// const vapidKeys = webPush.generateVAPIDKeys();

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
    "environment variables. You can use the following ones:");
  console.log(webPush.generateVAPIDKeys());
}

webPush.setVapidDetails(
  'mailto:someone@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);


function response(statusCode, body, file) {
  let payload = {
    statusCode,
    body: typeof (body) === 'string' ? body : JSON.stringify(body, null, 2),
  }
  if (file) {
    payload.headers = { 'content-type': mime.contentType(file) }
  }
  console.log('RESPOND', payload)
  return payload
}

module.exports.vapidPublicKey = async () => {
  return response(200, process.env.VAPID_PUBLIC_KEY);
}

module.exports.register = async (event, context) => {
  // Save the registered users subscriptions (event.body)
  subscriptions.push(JSON.parse(event.body))
  return response(201, event);
}

function send(subscriptions, payload, options, delay) {
  console.log('send', subscriptions, payload, options, delay)

  return new Promise((success) => {
    setTimeout(() => {

      Promise.all(subscriptions.map((each_subscription) => {
        return webPush.sendNotification(each_subscription, payload, options)
      }))
        .then(function () {
          success(response(201, {}))
        }).catch(function (error) {
          console.log('ERROR>', error);
          success(response(500, { error: error }))
        })

    }, 1000 * parseInt(delay))
  })
}

module.exports.sendNotification = async (event) => {
  console.log('register event', JSON.stringify(event, null, 2))
  let body = JSON.parse(event.body)
  const subscription = body.subscription;
  const payload = body.payload;
  const delay = body.delay;
  const options = {
    TTL: body.ttl | 5
  };

  return await send([subscription], payload, options, delay)
}

module.exports.registerOrSendToAll = async (event) => {
  // these two functions (register and SendtoAll) are in the same
  // handler, so that they share the same memory and we don't have
  // to setup a database for storing the subscriptions
  // this works for this test, but subscriptions will be deleted
  // when the lambda cointainer dies
  if (event.resource === '/register') {
    subscriptions.push(JSON.parse(event.body).subscription)
    return response(201, event);
  } else {
    console.log('register event', JSON.stringify(event, null, 2))
    let body = JSON.parse(event.body)
    console.log('got body', body)
    const payload = body.payload;
    const delay = body.delay;
    const options = {
      TTL: body.ttl | 5
    };
    return await send(subscriptions, payload, options, delay)
  }

}

module.exports.statics = async (event) => {
  // Serve static files from lambda (only for simplicity of this example)
  var file = fs.readFileSync(`./static${event.resource}`)
  return await response(200, file.toString(), event.resource.split('/')[1])
}