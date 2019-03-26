
const contentNode = document.getElementById("contents");

const orders = [
  {
    order: "1", status: "pending", deliveryAddress: "elm",
  }
];
 
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
    this.state = {orders: []}; 
    this.createOrder = this.createOrder.bind(this);
  }


  createOrder(newOrder) {
    const newOrders = this.state.orders.slice();
    newOrder.order = this.state.orders.length + 1;
    newOrders.push(newOrder);
    this.setState({ orders: newOrders });
    console.log(newOrders);
  }

  render() {
    return (
      <div>
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

ReactDOM.render(<OrderPage />, contentNode);
