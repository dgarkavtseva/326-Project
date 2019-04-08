// NEW

// Connect to the Project database. Note, if the database
// does not exist, it will create it with this call.
OrdersDB = new Mongo().getDB('CS326-DataBase-Orders');
ReviewsDB = new Mongo().getDB('CS326-DataBase-Reviews');
UsersDB = new Mongo().getDB('CS326-DataBase-Users');

// Next, we remove everything inside it. This is helpful to ensure that the
// database starts from a known state.
OrdersDB.orders.remove({});
ReviewsDB.reviews.remove({});
UsersDB.users.remove({});

// Now, we insert some mock data that mirrors the data that we have in the
// in-memory version of the `order.jsx` code.
OrdersDB.orders.insert([
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
      }
]);

UsersDB.users.insert([
    {
        fname: 'Jim', lname: 'Smith', email: 'jsmith@email.com',
      },
]);

ReviewsDB.reviews.insert([
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
// Lastly, we create "indexes" to make searching faster. For this particular
// application we know that searching on the status, owner, and created properties
// will be common, so we create indexes on those.

/*  IDK WHAT INDEXES WE NEED
OrdersDB.orders.createIndex({ status: 1 });
OrdersDB.orders.createIndex({ owner: 1 });
OrdersDB.orders.createIndex({ created: 1 });

ReviewsDB.reviews.createIndex({ status: 1 });
ReviewsDB.reviews.createIndex({ owner: 1 });
ReviewsDB.reviews.createIndex({ created: 1 });

UsersDB.users.createIndex({ status: 1 });
*/