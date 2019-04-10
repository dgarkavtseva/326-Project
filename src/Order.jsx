const contentNode = document.getElementById("contents");

const orders = [
  {
    order: undefined, status: undefined, deliveryAddress: undefined,
  }
];

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

// class OrderRow extends React.Component {
//   render() {
//     const order = this.props.order;
//     return (
//       <tr>
//         <td>{order.orderNumber}</td>
//         <td>{order.status}</td>
//         <td>{order.deliveryAdress}</td>
//       </tr>
//     );
//   }
// }

function FoodTable(props){
  console.log("food props");
  console.log(props);
    const foodRows = props.foods.map(food => (
      <FoodRow key={food._id} food={food} />
    ));
    console.log("foodRows");
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
  // componentDidMount() {
  //   // this.loadData();
  //   // this.loadplacedOrders();
  // }
  handleSubmit(event) {
    event.preventDefault();
    let form = document.forms.orderAdd;
    this.props.createOrder({
      orderNumber: form.orderNumber.value, 
      deliveryAdress: form.deliveryAdress.value,
      status: 'Pending'
    });
    form.orderNumber.value = '';
    form.deliveryAdress.value = '';
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
    console.log("constructor")
    this.state = { foods: [], orders: []};
    console.log("cons complete")
    this.createOrder = this.createOrder.bind(this);
  }
  componentDidMount() {
    console.log("mounted");

    this.loadData();
    console.log("mounted2");
    this.loadPlacedOrders();
  }

  loadData() {
    fetch('/api/menuDB').then(response => {
      console.log(response)
      console.log("loading");
      if (response.ok) {
        response.json().then(data => {
          console.log("data at 1");
          console.log(data);
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
    console.log("trying to load placed orders");
    fetch('/api/placedOrderDB').then(response => {
      console.log(response)
      console.log("loading order retrieval");
      if (response.ok) {
        response.json().then(data => {
          console.log("data at 2");
          console.log(data);
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
          res.json()
            .then(updatedOrder => {
              // updatedReview.created = new Date(updatedReview.created);
              // if (updatedReview.completionDate)
              //   updatedReview.completionDate = new Date(updatedReview.completionDate);
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
    // fetch('/api/reviewDB', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newReview),
    // })
    // if(newOrder.orderNumber != "" && newOrder.deliveryAdress != ""){
    //   const newOrders = this.state.orders.slice();
    //   newOrder.order = this.state.orders.length + 1;
    //   newOrders.push(newOrder);
    //   this.setState({ orders: newOrders });
    // }
  }
  
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <h2>These are the available options for grab and go today!</h2>
        <FoodTable foods={this.state.foods} />
        <hr />
        <h1>Place an Order!</h1>
        <h2>Fill out the form below</h2>        
        <OrderAdd createOrder={this.createOrder} />
        <hr />
        <h3>Here are your current orders:</h3>
        <OrderTable orders={this.state.orders} />
      </div>
    );
  }
}

ReactDOM.render(<OrderPage />, contentNode);
