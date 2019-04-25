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
        <td>{props.order.orderID}</td>
        <td>{props.order.buyer}</td>
        <td>{props.order.itemID}</td>
        <td>{props.order.address}</td>
        <td>{props.order.driver}</td>
        <td>{props.order.status}</td>
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
                    <th>orderID</th>
                    <th>buyer</th>
                    <th>itemID</th>
                    <th>address</th>
                    <th>driver</th>
                    <th>status</th>
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
    if(form.itemID.value != "" && form.address.value != ""){
      this.props.createOrder({
        itemID: form.itemID.value, 
        address: form.address.value,
        status: 'Pending'
      });
      form.itemID.value = '';
      form.address.value = '';
    }
  }

  render() {
    return (
      <div>
        <form name="orderAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="itemID" placeholder="Item Number" />
          <input type="text" name="address" placeholder="Your Address" />
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
    fetch('/api/ordersDB').then(response => {
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
    fetch('/api/ordersDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then(res => {
        if (res.ok) {
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
