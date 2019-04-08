const contentNode = document.getElementById("contents");

/*const foods = [
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
 ];*/

const orders = [
  {
    order: undefined, status: undefined, deliveryAddress: undefined,
  }
];
 
class FoodRow extends React.Component {
  render() {
    const food = this.props.food;
    return (
      <tr>
        <td>{food.order}</td>
        <td>{food.food}</td>
        <td>{food.diningHall}</td>
      </tr>
    );
  }
}

class OrderRow extends React.Component {
  render() {
    const order = this.props.order;
    return (
      <tr>
        <td>{order.orderNumber}</td>
        <td>{order.status}</td>
        <td>{order.deliveryAdress}</td>
      </tr>
    );
  }
}

class FoodTable extends React.Component {
  render() {
    const foodRows = this.props.foods.map(food => (
      <FoodRow key={food.order} food={food} />
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
}

class OrderTable extends React.Component {
  render() {
    const OrderRows = this.props.orders.map(order => (
      <OrderRow key={order.order} order={order} />
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
        <tbody>{OrderRows}</tbody>
      </table>
    );
  }
}
class OrderAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status) {
      return;
    }
    this.loadData();
  }

  loadData() {
    // Note: React Router automatically adds a "location" property to a react
    //       object's "props". The object that the "location" property refers
    //       to also has a "search" property which is the query string of the
    //       URL, including the '?' character  -  which is why we do not need
    //       to add it to the string in the `fetch()` call.
    fetch(`/order/orderDB${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          //console.log("Total count of records:", data._metadata.total_count);
          // data.records.forEach(order => {
          //   order.created = new Date(issue.created);
          //   if (issue.completionDate)
          //     issue.completionDate = new Date(issue.completionDate);
          // });
          this.setState({ orders: data.records });
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
  createOrder(newIssue) {
    fetch('/order/orderDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(updatedIssue => {
              // updatedIssue.created = new Date(updatedIssue.created);
              // if (updatedIssue.completionDate)
              //   updatedIssue.completionDate = new Date(updatedIssue.completionDate);
              // const newIssues = this.state.issues.concat(updatedIssue);
               this.setState({ orders: newIssues });
            });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add issue: ' + error.message);
            });
        }
      });
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
    this.state = { foods: foods, orders: [] };
    this.createOrder = this.createOrder.bind(this);
  }

  createItem(newFood) {
    const newFoods = this.state.foods.slice();
    newFood.order = this.state.foods.length + 1;
    newFoods.push(newFood);
    this.setState({ foods: newFoods });
  }
  createOrder(newOrder) {
    if(newOrder.orderNumber != "" && newOrder.deliveryAdress != ""){
      const newOrders = this.state.orders.slice();
      newOrder.order = this.state.orders.length + 1;
      newOrders.push(newOrder);
      this.setState({ orders: newOrders });
    }
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
        {/* <OrderAdd createOrder={this.createOrder} />
        <hr />
        <h3>Here are your current orders:</h3>
        <OrderTable orders={this.state.orders} />  */}
      </div>
    );
  }
}
// OrderList.propTypes = {
//   location: React.PropTypes.object.isRequired,
//   router: React.PropTypes.object,
// };
ReactDOM.render(<OrderPage />, contentNode);
