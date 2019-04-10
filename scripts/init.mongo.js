menuDB = new Mongo().getDB('menuDB');
placedOrdersDB = new Mongo().getDB('placedOrdersDB');
reviewsDB = new Mongo().getDB('reviewsDB');
usersDB = new Mongo().getDB('usersDB');
deliveriesDB = new Mongo().getDB('deliveriesDB');

// Next, we remove everything inside it. This is helpful to ensure that the
// database starts from a known state.
menuDB.orders.remove({});
placedOrdersDB.orders.remove({});
reviewsDB.reviews.remove({});
usersDB.users.remove({});
deliveriesDB.deliveries.remove({});

// Now, we insert some mock data that mirrors the data that we have in the
// in-memory version of the `order.jsx` code.
menuDB.items.insert([
    {
        order: 1, food: 'Chicken Tenders', diningHall: 'Worcester',
      },
      {
        order: 2, food: 'Mac and Cheese', diningHall: 'Berk',
      },
      {
        order: 3, food: 'Orange Chicken', diningHall: 'Frank',
      },
      {
        order: 4, food: 'Sushi', diningHall: 'Worcester',   
      }, {
        order: 5, food: 'Potatoes', diningHall: 'Berk',   
      }
]);

usersDB.users.insert([
    {
        fname: 'Jim', lname: 'Smith', email: 'jsmith@email.com',
      },
]);

reviewsDB.reviews.insert([
    {
        name: "Joe Shmoe",
        created: new Date("2019-03-24"),
        time: "4:00pm",
        orderFrom: "Baby Berk 1",
        orderItem: "Hampshire Burger",
        driver: "Bob Bobert",
        review: "Food arrived warm, but in a open container, so the burger was tossed around and had fallen apart before it arrived"
      },
      {
        name: "Bob Bobert",
        created: new Date("2019-03-25"),
        time: "1:00pm",
        orderFrom: "Frank Grab & Go",
        orderItem: "Orange Chicken",
        driver: "Joe Shmoe",
        review: "Food arrived warm, and within 15 minutes of placing my order"
      }
]);      

deliveriesDB.deliveries.insert([
  {
      status: 'pending', deliveryAdress: "Elm", orderID: '30',Deliverer: "Biker"
    },
]);

placedOrdersDB.placedOrders.insert([
  {
      orderNumber: '5444', status: "Elm", deliveryAdress: 'JQA'
  },
]);
