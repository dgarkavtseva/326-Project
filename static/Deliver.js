"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "We will add a search bar here to searh for specific items."
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var ReviewRow = function ReviewRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.review.name
    ),
    React.createElement(
      "td",
      null,
      props.review.created.toDateString()
    ),
    React.createElement(
      "td",
      null,
      props.review.time
    ),
    React.createElement(
      "td",
      null,
      props.review.orderFrom
    ),
    React.createElement(
      "td",
      null,
      props.review.orderItem
    ),
    React.createElement(
      "td",
      null,
      props.review.driver
    ),
    React.createElement(
      "td",
      null,
      props.review.review
    )
  );
};

function ReviewTable(props) {
  var reviewRows = props.reviews.map(function (review) {
    return React.createElement(ReviewRow, { key: review._id, review: review });
  });
  return React.createElement(
    "table",
    { className: "bordered-table" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "Name"
        ),
        React.createElement(
          "th",
          null,
          "Date"
        ),
        React.createElement(
          "th",
          null,
          "Time"
        ),
        React.createElement(
          "th",
          null,
          "Ordered From"
        ),
        React.createElement(
          "th",
          null,
          "Order"
        ),
        React.createElement(
          "th",
          null,
          "Driver"
        ),
        React.createElement(
          "th",
          null,
          "Review"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      reviewRows
    )
  );
}

var ReviewAdd = function (_React$Component2) {
  _inherits(ReviewAdd, _React$Component2);

  function ReviewAdd() {
    _classCallCheck(this, ReviewAdd);

    var _this2 = _possibleConstructorReturn(this, (ReviewAdd.__proto__ || Object.getPrototypeOf(ReviewAdd)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(ReviewAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.reviewAdd;
      this.props.createReview({
        name: form.name.value,
        time: form.time.value,
        orderFrom: form.orderFrom.value,
        orderItem: form.orderItem.value,
        driver: form.driver.value,
        review: form.review.value,
        created: new Date()
      });
      // Clear the form for the next input.
      form.name.value = '';
      form.time.value = '';
      form.orderFrom.value = '';
      form.orderItem.value = '';
      form.driver.value = '';
      form.review.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "reviewAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "name", placeholder: "Name" }),
          React.createElement("input", { type: "text", name: "time", placeholder: "Time" }),
          React.createElement("input", { type: "text", name: "orderFrom", placeholder: "Ordered From" }),
          React.createElement("input", { type: "text", name: "orderItem", placeholder: "Order" }),
          React.createElement("input", { type: "text", name: "driver", placeholder: "Driver" }),
          React.createElement("input", { type: "text", name: "review", placeholder: "Review" }),
          React.createElement(
            "button",
            null,
            "Add"
          )
        )
      );
    }
  }]);

  return ReviewAdd;
}(React.Component);

var ReviewList = function (_React$Component3) {
  _inherits(ReviewList, _React$Component3);

  function ReviewList() {
    _classCallCheck(this, ReviewList);

    var _this3 = _possibleConstructorReturn(this, (ReviewList.__proto__ || Object.getPrototypeOf(ReviewList)).call(this));

    _this3.state = { reviews: [] };

    // this.createReview = this.createReview.bind(this);
    return _this3;
  }

  _createClass(ReviewList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this4 = this;

      fetch('/api/reviewDB').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(function (review) {
              review.created = new Date(review.created);
              if (review.completionDate) review.completionDate = new Date(review.completionDate);
            });
            _this4.setState({ reviews: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch reviews:" + error.message);
          });
        }
      }).catch(function (err) {
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

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Reviews"
        ),
        React.createElement(SearchBar, null),
        React.createElement("hr", null),
        React.createElement(ReviewTable, { reviews: this.state.reviews }),
        React.createElement("hr", null),
        React.createElement(ReviewAdd, { createReview: this.createReview })
      );
    }
  }]);

  return ReviewList;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(ReviewList, null), contentNode);