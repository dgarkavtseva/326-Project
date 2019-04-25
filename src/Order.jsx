//notifications
let existingLength = -1;
let currLength = -1;
function refresh(){
  console.log("inf");
  fetch('/api/placedOrderDB').then(response => {
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

////end notifications 

const contentNode = document.getElementById("contents");

const FoodRow = (props) => (
  <tr>
    <td>{props.food.order}</td>
    <td>{props.food.food}</td>
    <td>{props.food.diningHall}</td>
  </tr>
);


const OrderRow = (props) => (
  <tr>
    <td>{props.order.orderNumber}</td>
    <td>{props.order.status}</td>
    <td>{props.order.deliveryAdress}</td>
  </tr>
);

function FoodTable(props){
    const foodRows = props.foods.map(food => (
      <FoodRow key={food._id} food={food} />
    ));
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Food</th>
            <th>Dining Hall</th>
          </tr>
        </thead>
        <tbody>{foodRows}</tbody>
      </table>
    );
}
 
  function OrderTable(props) {
    const orderRows = props.orders.map(order => (
      <OrderRow key={order._id} order={order} />
    ));
    return (
      <table className="bordered-table">
        <thead>
        <tr>
            <th>Order Number</th>
             <th>Status</th>
             <th>Delivery Address</th>
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
    if(form.orderNumber.value != "" && form.deliveryAdress.value != ""){
      this.props.createOrder({
        orderNumber: form.orderNumber.value, 
        deliveryAdress: form.deliveryAdress.value,
        status: 'Pending'
      });
      form.orderNumber.value = '';
      form.deliveryAdress.value = '';
      
    }
  }

  render() {
    return (
      <div>
        <form name="orderAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="orderNumber" placeholder="Order Number" />
          <input type="text" name="deliveryAdress" placeholder="Your Address" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}


class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = { foods: [], orders: []};
    this.createOrder = this.createOrder.bind(this);
  }
  componentDidMount() {
    this.loadData();
    this.loadPlacedOrders();
  }

  loadData() {
    fetch('/api/menuDB').then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.state = { foods: data, orders: this.state.orders};
          this.setState({ foods: data});
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

  loadPlacedOrders() {
    fetch('/api/placedOrderDB').then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.state = { foods: this.state.foods , orders: data}; //potential error
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
    
    fetch('/api/placedOrderDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then(res => {
        if (res.ok) {
          let existingOrders = this.state.orders.slice();
          currLength = existingOrders.length;
          // console.log(existingOrders.length);
          res.json()
            .then(updatedOrder => {
              const newOrder = this.state.orders.concat(updatedOrder);
              this.setState({ orders: newOrder });
            });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add review: ' + error.message);
            });
        }
      });
  }
  
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <h2>These are the available options for grab and go today!</h2>
        <FoodTable foods={this.state.foods} />
        <hr />
        <h1>Place an Order!</h1>
        <h2>Fill out all fields in the form below.</h2>        
        <OrderAdd createOrder={this.createOrder} />
        <hr />
        <h3>Here are your current orders:</h3>
        <OrderTable orders={this.state.orders} />
      </div>
    );
  }
}

ReactDOM.render(<OrderPage />, contentNode);



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
}