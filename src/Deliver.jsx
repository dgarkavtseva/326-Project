const contentNode = document.getElementById("contents");

const orders = [
  {
    order: undefined, status: undefined, deliveryAddress: undefined,
  }
];

const OrderRow = (props) => (
  <tr>
       <td>{props.order.orderNumber}</td>
       <td>{props.order.status}</td>
      <td>{props.order.deliveryAdress}</td>
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
          <input type="text" name="deliveryAdress" placeholder="Your Name" />
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
    this.state = { orders: []};
    console.log("cons complete")
    this.createOrder = this.createOrder.bind(this);
  }
  componentDidMount() {
    console.log("mounted");

    console.log("mounted2");
    this.loadPlacedOrders();
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
    fetch('/api/placedOrderDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(updatedOrder => {
              console.log("updated order");
              console.log(updatedOrder);
              console.log("existing orders");
              console.log(this.state.orders.slice());
              let apples = this.state.orders.slice();
              let exists = false;
              apples.forEach(function match(element){
                console.log(element.orderNumber);
                console.log("match?????");
                console.log(element.orderNumber* 2 / 2 === updatedOrder.orderNumber * 2 / 2)
                if(element.orderNumber* 2 / 2 === updatedOrder.orderNumber * 2 / 2){
                  console.log("match found");
                  element.status = "accepted";
                  element.Deliverer = updatedOrder.Deliverer;
                  exists = true;
                }
              });

              if(!exists){
                const apples = this.state.orders.concat(updatedOrder);
              
                
              }
              this.setState({ orders: apples });

              
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
        {/* <h1>Menu</h1>
        <h2>These are the available options for grab and go today!</h2> */}
        {/* <FoodTable foods={this.state.foods} /> */}
        <hr />
             
        
        <hr />
        <h3>Here are your current orders:</h3>
        <br></br>
        <hr></hr>
        <h1>Claim an Order!</h1>
        <h2>Fill out the form below</h2>   
        <OrderAdd createOrder={this.createOrder} />
        <OrderTable orders={this.state.orders} />
      </div>
    );
  }
}























ReactDOM.render(<OrderPage />, contentNode);
