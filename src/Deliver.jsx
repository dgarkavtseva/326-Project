
const contentNode = document.getElementById("contents");
const orders = [
  {
    orderNumber: "2", status: 'pending', deliveryAdress: "Elm", orderID: 50, Deliverer: "NA", 
  }, {
    orderNumber: "5", status: 'pending', deliveryAdress: "Van Meter", orderID: 51, Deliverer: "NA",
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
        <td>{order.orderID}</td>
        <td>{order.Deliverer}</td>
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
            <th>Menu Item</th>
            <th>Status</th>
            <th>Delivery Address</th>
            <th>Order ID</th>
            <th>Deliverer</th>
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
  handleSubmit(event) {
    event.preventDefault();
    let form = document.forms.orderAdd;
    this.props.createOrder({
      Deliverer: form.deliveryAdress.value, 
      orderID: form.orderNumber.value,
      status: 'Pending'
    });
    form.orderNumber.value = '';
    form.deliveryAdress.value = '';
  }

  render() {
    return (
      <div>
        <form name="orderAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="deliveryAdress" placeholder="Name" />
          <input type="text" name="orderNumber" placeholder="Order ID" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = {orders: orders };
    setTimeout(this.createOrderInit.bind(this), 2000);
    this.createOrder = this.createOrder.bind(this);
  }

 
  createOrder(newOrder) {
    if(newOrder.orderID != "" && newOrder.deliveryAdress != ""){
      const newOrders = this.state.orders.slice();
      let exists = false;
      newOrders.forEach(function match(element){

        if(element.orderID * 2 / 2 === newOrder.orderID * 2 / 2){
          element.status = "accepted";
          element.Deliverer = newOrder.Deliverer;
          exists = true;
        }
      });
      if(!exists){
        newOrder.order = this.state.orders.length + 1;
        newOrders.push(newOrder);
        
      }
      this.setState({ orders: newOrders });
    }
  }

  createOrderInit() {
    this.createOrder({
      orderNumber: 1,
      status: "pending",
      deliveryAdress: "Maple", 
      orderID: 52, Deliverer: "NA"
    });
  }
  

  render() {
    return (
      <div>
        
        <h2>Select an order to fulfill</h2>        
        
        <hr />
        <h3>Current orders:</h3>
        <OrderTable orders={this.state.orders} />
        <OrderAdd createOrder={this.createOrder} />
      </div>
    );
  }
}

ReactDOM.render(<OrderPage />, contentNode);
