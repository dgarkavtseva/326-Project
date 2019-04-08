// NEW

// Connect to the Project database. Note, if the database
// does not exist, it will create it with this call.
db = new Mongo().getDB('CS326-DataBase');

// Next, we remove everything inside it. This is helpful to ensure that the
// database starts from a known state.
db.orders.remove({});

// Now, we insert some mock data that mirrors the data that we have in the
// in-memory version of the `order.jsx` code.
db.orders.insert([
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
      },]);

// Lastly, we create "indexes" to make searching faster. For this particular
// application we know that searching on the status, owner, and created properties
// will be common, so we create indexes on those.

/*  IDK WHAT INDEXES WE NEED
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
*/