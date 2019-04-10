
// const contentNode = document.getElementById("contents");
// const orders = [
//   {
//     orderNumber: "2", status: 'pending', deliveryAdress: "Elm", orderID: 50, Deliverer: "NA", 
//   }, {
//     orderNumber: "5", status: 'pending', deliveryAdress: "Van Meter", orderID: 51, Deliverer: "NA",
//   }
// ];
 
// class OrderRow extends React.Component {
//   render() {
//     const order = this.props.order;
//     return (
//       <tr>
//         <td>{order.orderNumber}</td>
//         <td>{order.status}</td>
//         <td>{order.deliveryAdress}</td>
//         <td>{order.orderID}</td>
//         <td>{order.Deliverer}</td>
//       </tr>
//     );
//   }
// }


// class OrderTable extends React.Component {
//   render() {
//     const OrderRows = this.props.orders.map(order => (
//       <OrderRow key={order.order} order={order} />
//     ));
//     return (
//       <table className="bordered-table">
//         <thead>
//           <tr>
//             <th>Menu Item</th>
//             <th>Status</th>
//             <th>Delivery Address</th>
//             <th>Order ID</th>
//             <th>Deliverer</th>
//           </tr>
//         </thead>
//         <tbody>{OrderRows}</tbody>
//       </table>
//     );
//   }
// }
// class OrderAdd extends React.Component {
//   constructor() {
//     super();
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     let form = document.forms.orderAdd;
//     this.props.createOrder({
//       Deliverer: form.deliveryAdress.value, 
//       orderID: form.orderNumber.value,
//       status: 'Pending'
//     });
//     form.orderNumber.value = '';
//     form.deliveryAdress.value = '';
//   }

//   render() {
//     return (
//       <div>
//         <form name="orderAdd" onSubmit={this.handleSubmit}>
//           <input type="text" name="deliveryAdress" placeholder="Name" />
//           <input type="text" name="orderNumber" placeholder="Order ID" />
//           <button>Add</button>
//         </form>
//       </div>
//     );
//   }
// }
// class OrderPage extends React.Component {
//   constructor() {
//     super();
//     this.state = {orders: orders };
//     setTimeout(this.createOrderInit.bind(this), 2000);
//     this.createOrder = this.createOrder.bind(this);
//   }

 
//   createOrder(newOrder) {
//     if(newOrder.orderID != "" && newOrder.deliveryAdress != ""){
//       const newOrders = this.state.orders.slice();
//       let exists = false;
//       newOrders.forEach(function match(element){

//         if(element.orderID * 2 / 2 === newOrder.orderID * 2 / 2){
//           element.status = "accepted";
//           element.Deliverer = newOrder.Deliverer;
//           exists = true;
//         }
//       });
//       if(!exists){
//         newOrder.order = this.state.orders.length + 1;
//         newOrders.push(newOrder);
        
//       }
//       this.setState({ orders: newOrders });
//     }
//   }

//   createOrderInit() {
//     this.createOrder({
//       orderNumber: 1,
//       status: "pending",
//       deliveryAdress: "Maple", 
//       orderID: 52, Deliverer: "NA"
//     });
//   }
  

//   render() {
//     return (
//       <div>
        
//         <h2>Select an order to fulfill</h2>        
        
//         <hr />
//         <h3>Current orders:</h3>
//         <OrderTable orders={this.state.orders} />
//         <OrderAdd createOrder={this.createOrder} />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<OrderPage />, contentNode);



var contentNode = document.getElementById("contents");

// import React from 'react';
// import 'isomorphic-fetch';
// import { Link } from 'react-router';

class SearchBar extends React.Component {
  render() {
    return <div>We will add a search bar here to searh for specific items.</div>;
  }
}

const ReviewRow = (props) => (
  <tr>
    <td>{props.review.name}</td>
    <td>{props.review.created.toDateString()}</td>
    <td>{props.review.time}</td>
    <td>{props.review.orderFrom}</td>
    <td>{props.review.orderItem}</td>
    <td>{props.review.driver}</td>
    <td>{props.review.review}</td>
  </tr>
);

function ReviewTable(props) {
  const reviewRows = props.reviews.map(review => (
    <ReviewRow key={review._id} review={review} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Ordered From</th>
          <th>Order</th>
          <th>Driver</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>{reviewRows}</tbody>
    </table>
  );
}

class ReviewAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.reviewAdd;
    this.props.createReview({
      name: form.name.value,
      time: form.time.value,
      orderFrom: form.orderFrom.value,
      orderItem: form.orderItem.value,
      driver: form.driver.value,
      review: form.review.value,
      created: new Date(),
    });
    // Clear the form for the next input.
    form.name.value = '';
    form.time.value = '';
    form.orderFrom.value = '';
    form.orderItem.value = '';
    form.driver.value = '';
    form.review.value = '';

  }

  render() {
    return (
      <div>
        <form name="reviewAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="time" placeholder="Time" />
          <input type="text" name="orderFrom" placeholder="Ordered From" />
          <input type="text" name="orderItem" placeholder="Order" />
          <input type="text" name="driver" placeholder="Driver" />
          <input type="text" name="review" placeholder="Review" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class ReviewList extends React.Component {
  constructor() {
    super();
    this.state = { reviews: [] };

    // this.createReview = this.createReview.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/reviewDB').then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach(review => {
            review.created = new Date(review.created);
            if (review.completionDate)
              review.completionDate = new Date(review.completionDate);
          });
          this.setState({ reviews: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch reviews:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  // createReview(newReview) {
  //   fetch('/api/reviewDB', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newReview),
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         res.json()
  //           .then(updatedReview => {
  //             updatedReview.created = new Date(updatedReview.created);
  //             if (updatedReview.completionDate)
  //               updatedReview.completionDate = new Date(updatedReview.completionDate);
  //             const newReview = this.state.reviews.concat(updatedReview);
  //             this.setState({ reviews: newReview });
  //           });
  //       }
  //       else {
  //         res.json()
  //           .then(error => {
  //             alert('Failed to add review: ' + error.message);
  //           });
  //       }
  //     });
  // }

  render() {
    return (
      <div>
        <h1>Reviews</h1>
        <SearchBar />
        <hr />
        <ReviewTable reviews={this.state.reviews} />
        <hr />
        <ReviewAdd createReview={this.createReview} />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<ReviewList />, contentNode);
