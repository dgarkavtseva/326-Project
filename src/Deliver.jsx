const contentNode = document.getElementById("contents");
//const MongoClient = require('mongodb').MongoClient;

const OrderRow = (props) => (
  <tr>
      <td>{props.order.orderID}</td>
      <td>{props.order.buyer}</td>
      <td>{props.order.itemID}</td>
      <td>{props.order.address}</td>
      <td>{props.order.driver}</td>
      <td>{props.order.status}</td>
  </tr>
);

function OrderTable(props) {
  const orderRows = props.orders.map(order => (
    <OrderRow key={order._id} order={order} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
           <th>Order ID</th>
           <th>Buyer</th>
           <th>Item ID</th>
           <th>Address</th>
           <th>Driver</th>
           <th>Status</th>
         </tr>
      </thead>
      <tbody>{orderRows}</tbody>
    </table>
  );
}


class OrderAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let form = document.forms.orderAdd;
    //check that all fields are filled out
      if (form.orderID.value != "" && form.driver.value != "") {
          this.props.createOrder({ //this needs fixing with the new name system
            orderID: form.orderID.value, 
            driver: form.driver.value,
            status: 'Pending'
          });
          form.orderID.value = '';
          form.driver.value = '';
    }
  }

  render() {
    return (
      <div>
        <form name="orderAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="orderID" placeholder="OrderID" />
          <input type="text" name="driver" placeholder="Your Name" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}



class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = { orders: [], ordersDB: []};
    this.createOrder = this.createOrder.bind(this);
    /*MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
        this.state.ordersDB = connection.db('ordersDB');
      }).catch(error => {
          console.log('ERROR:', error);
    });*/

  }
  componentDidMount() {
    this.loadPlacedOrders();
  }

  

  loadPlacedOrders() {
    fetch('/api/ordersDB').then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.state = {  orders: data}; //potential error
          this.setState({ orders: data});
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  
  createOrder(newOrder) {
    fetch('/api/ordersDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(updatedOrder => {
              let existingOrders = this.state.orders.slice();
              existingOrders.forEach(function match(element){
                if(parseInt(element.orderID) === parseInt(updatedOrder.orderID)){
                  element.status = "Accepted";
                  element.driver = updatedOrder.driver;
                }/*
                  let query = { orderID: parseInt(updatedOrder.orderID) };
                  let newValues = { $set: { driver: updatedOrder.driver, status: "Accetped" } };
                  this.state.ordersDB.collection("orders").updateOne(query, newValues, function (err, res) {
                      if (err) {
                          throw err;
                      }
                      console.log("1 order updated");
                  });*/
              });
              this.setState({ orders: existingOrders });  
            });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add delivery: ' + error.message);
            });
        }
      });
  
  }
  
  render() {
    return (
      <div>
        <h1>Claim an Order!</h1>
        <h3>Fill out all fields in the form below.</h3>  
        <hr /> 
        <OrderAdd createOrder={this.createOrder} />
        <hr />
        <center>
        <OrderTable orders={this.state.orders} />
        </center>
      </div>
    );
  }
}


ReactDOM.render(<OrderPage />, contentNode);
//notifications
let existingLength = -1;
let currLength = -1;
function refresh(){
  console.log("inf");
  fetch('/api/OrdersDB').then(response => {
    if (response.ok) {
      response.json().then(data => {
        currLength = data.length;
      });
    } else {
      response.json().then(error => {
        alert("Failed to fetch issues:" + error.message)
      });
    }
  }).catch(err => {
  });
  
    if (existingLength === -1){
      existingLength = currLength; //prevents notification on load
    }
     if (currLength != existingLength){
      existingLength = currLength;
      sendNotification();
    }
  setTimeout(refresh, 500);
}
setTimeout(refresh, 4000);





function sendNotification () {
  let mobile = false;
  if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){
    //mobile detectoin strategy found here: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    alert("A new order has been placed!");
  }else{
    let notificationContent = {
    title: 'Dine Online',
    message: 'A new order has been placed!',
    icon:'truck.png',
    };
      var sendNotification = function (){
      var notification = new Notification('Dine Online', {
        icon: 'truck.png',
        body: 'A new order has been placed!'
      })
    }
    if (window.Notification) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      } 
      sendNotification()
    } 
  }
}////end notifications 