
const contentNode = document.getElementById("contents");

const foods = [
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
 ];

const orders = [
  {
    order: undefined, status: undefined, deliveryAddress: undefined,
  }
];
 
class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.order}</td>
        <td>{issue.food}</td>
        <td>{issue.diningHall}</td>
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

class ItemTable extends React.Component {
  render() {
    const issueRows = this.props.foods.map(issue => (
      <IssueRow key={issue.order} issue={issue} />
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
        <tbody>{issueRows}</tbody>
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

class Order extends React.Component {
  
  render() {
    return (
      <div>
        <h1>Place an Order!</h1>
        <h2>Fill out the form below</h2>
        
        
      </div>
    );  }
}
class OrderAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.orderAdd;
    this.props.createOrder({
      orderNumber: form.orderNumber.value,
      
      deliveryAdress: form.deliveryAdress.value,
      status: 'Pending'
    });
    // Clear the form for the next input.
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
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { foods: foods, orders: [] };
    setTimeout(this.createItem.bind(this), 2000);
    this.createOrder = this.createOrder.bind(this);
  }

  createNew(newIssue) {
    const newIssues = this.state.foods.slice();
    newIssue.order = this.state.foods.length + 1;
    newIssues.push(newIssue);
    this.setState({ foods: newIssues });
  }
  createOrder(newIssue) {
    const newIssues = this.state.orders.slice();
    newIssue.order = this.state.orders.length + 1;
    newIssues.push(newIssue);
    this.setState({ orders: newIssues });
  }
  createItem() {
    this.createNew({
      order: 5,
      food: 'Pasta',
      diningHall: 'Hamp'
    });
  }

  render() {
    return (
      <div>
        <h1>Menu</h1>
        <h2>These are the available options for grab and go today!</h2>
        <ItemTable foods={this.state.foods} />
        <hr />
        <Order />
        <hr />
        
        <OrderAdd createOrder={this.createOrder} />
        <hr />
        <h3>Here are your current orders:</h3>
        <OrderTable orders={this.state.orders} />
        
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
