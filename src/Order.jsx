const contentNode = document.getElementById("contents");

// const foods = [
//   {
//     order: 1, food: 'Chicken Tenders', diningHall: 'Worcester',
//   },
//   {
//     order: 2, food: 'Mac and Cheese', diningHall: 'Berk',
//   },
//   {
//     order: 3, food: 'Orange Chicken', diningHall: 'Frank',
//   },
//   {
//     order: 4, food: 'Sushi', diningHall: 'Worcester',   
//   }
//  ];

// const orders = [
//   {
//     order: undefined, status: undefined, deliveryAddress: undefined,
//   }
// ];
 
// const FoodRow = (props) => (
  
//       <tr>
//         <td>{food._order}</td>
//         <td>{food.food}</td>
//         <td>{food.diningHall}</td>
//       </tr>
//     );

function FoodRow(props) {
  console.log("in foodrow function")
  return (
    <tr>
         <td>{food._order}</td>
         <td>{food.food}</td>
         <td>{food.diningHall}</td>
       </tr>
  );
}

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
  console.log("foodRows Start")
  console.log(props)
    const foodRows = props.foods.map(food => (
      <FoodRow key={food._order} food={food} />
    ));
    console.log("foodRows")
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


// class OrderTable extends React.Component {
//   render() {
//     const OrderRows = this.props.orders.map(order => (
//       <OrderRow key={order.order} order={order} />
//     ));
//     return (
//       <table className="bordered-table">
//         <thead>
//           <tr>
//             <th>Order Number</th>
//             <th>Status</th>
//             <th>Delivery Address</th>
//           </tr>
//         </thead>
//         <tbody>{OrderRows}</tbody>
//       </table>
//     );
//   }
// }
/*class OrderAdd extends React.Component {
  constructor() {
    super();
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
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
          <input type="text" name="deliveryAdress" placeholder="Your Address" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}*/
class OrderPage extends React.Component {
  constructor() {
    super();
    console.log("constructor")
    this.state = { foods: []};
    console.log("cons complete")
    //this.createOrder = this.createOrder.bind(this);
  }
  componentDidMount() {
    console.log("mounted")
    console.log("mounted")

    this.loadData();
  }

  loadData() {
    fetch('/order/orderDB').then(response => {
      console.log(response)
      if (response.ok) {
        response.json().then(data => {
          console.log(data)
          //console.log("Total count of records:", data._metadata.total_count);
          // data.records.forEach(issue => {
          //   issue.created = new Date(issue.created);
          //   if (issue.completionDate)
          //     issue.completionDate = new Date(issue.completionDate);
          // });
          this.setState({ foods: data.records });
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

  createItem(newFood) {
    const newFoods = this.state.foods.slice();
    newFood.order = this.state.foods.length + 1;
    newFoods.push(newFood);
    this.setState({ foods: newFoods });
  }
  // createOrder(newOrder) {
  //   if(newOrder.orderNumber != "" && newOrder.deliveryAdress != ""){
  //     const newOrders = this.state.orders.slice();
  //     newOrder.order = this.state.orders.length + 1;
  //     newOrders.push(newOrder);
  //     this.setState({ orders: newOrders });
  //   }
  // }
  
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <h2>These are the available options for grab and go today!</h2>
        <FoodTable foods={this.state.foods} />
        <hr />
        <h1>Place an Order!</h1>
        {/* <h2>Fill out the form below</h2>        
        <OrderAdd createOrder={this.createOrder} />
        <hr />
        <h3>Here are your current orders:</h3>
        <OrderTable orders={this.state.orders} />  */}
      </div>
    );
  }
}

ReactDOM.render(<OrderPage />, contentNode);
