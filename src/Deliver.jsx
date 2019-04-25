const contentNode = document.getElementById("contents");


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
    this.state = { orders: []};
    this.createOrder = this.createOrder.bind(this);
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
              let exists = false;
              existingOrders.forEach(function match(element){
                if(parseInt(element.orderID) === parseInt(updatedOrder.orderID)){
                  element.status = "Accepted";
                  element.driver = updatedOrder.driver;
                  exists = true;
                }
              });

             /*if (!exists) {
                existingOrders = this.state.orders.concat(updatedOrder);
              }*/
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
        <OrderTable orders={this.state.orders} />
      </div>
    );
  }
}


ReactDOM.render(<OrderPage />, contentNode);
