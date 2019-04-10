"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

var orders = [{
  order: undefined, status: undefined, deliveryAddress: undefined
}];

var FoodRow = function FoodRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.food.order
    ),
    React.createElement(
      "td",
      null,
      props.food.food
    ),
    React.createElement(
      "td",
      null,
      props.food.diningHall
    )
  );
};

var OrderRow = function OrderRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.order.orderNumber
    ),
    React.createElement(
      "td",
      null,
      props.order.status
    ),
    React.createElement(
      "td",
      null,
      props.order.deliveryAdress
    )
  );
};

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

function FoodTable(props) {
  console.log("food props");
  console.log(props);
  var foodRows = props.foods.map(function (food) {
    return React.createElement(FoodRow, { key: food._id, food: food });
  });
  console.log("foodRows");
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
          "Order Number"
        ),
        React.createElement(
          "th",
          null,
          "Food"
        ),
        React.createElement(
          "th",
          null,
          "Dining Hall"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      foodRows
    )
  );
}

function OrderTable(props) {
  var orderRows = props.orders.map(function (order) {
    return React.createElement(OrderRow, { key: order._id, order: order });
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
          "Order Number"
        ),
        React.createElement(
          "th",
          null,
          "Status"
        ),
        React.createElement(
          "th",
          null,
          "Delivery Address"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      orderRows
    )
  );
}

var OrderAdd = function (_React$Component) {
  _inherits(OrderAdd, _React$Component);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }
  // componentDidMount() {
  //   // this.loadData();
  //   // this.loadplacedOrders();
  // }


  _createClass(OrderAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var form = document.forms.orderAdd;
      this.props.createOrder({
        orderNumber: form.orderNumber.value,
        deliveryAdress: form.deliveryAdress.value,
        status: 'Pending'
      });
      form.orderNumber.value = '';
      form.deliveryAdress.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "orderAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "orderNumber", placeholder: "Order Number" }),
          React.createElement("input", { type: "text", name: "deliveryAdress", placeholder: "Your Address" }),
          React.createElement(
            "button",
            null,
            "Add"
          )
        )
      );
    }
  }]);

  return OrderAdd;
}(React.Component);

var OrderPage = function (_React$Component2) {
  _inherits(OrderPage, _React$Component2);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this2 = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    console.log("constructor");
    _this2.state = { foods: [], orders: [] };
    console.log("cons complete");
    _this2.createOrder = _this2.createOrder.bind(_this2);
    return _this2;
  }

  _createClass(OrderPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("mounted");

      this.loadData();
      console.log("mounted2");
      this.loadPlacedOrders();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this3 = this;

      fetch('/api/menuDB').then(function (response) {
        console.log(response);
        console.log("loading");
        if (response.ok) {
          response.json().then(function (data) {
            console.log("data at 1");
            console.log(data);
            _this3.state = { foods: data, orders: _this3.state.orders };
            _this3.setState({ foods: data });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch issues:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: "loadPlacedOrders",
    value: function loadPlacedOrders() {
      var _this4 = this;

      console.log("trying to load placed orders");
      fetch('/api/placedOrderDB').then(function (response) {
        console.log(response);
        console.log("loading order retrieval");
        if (response.ok) {
          response.json().then(function (data) {
            console.log("data at 2");
            console.log(data);
            _this4.state = { foods: _this4.state.foods, orders: data }; //potential error
            _this4.setState({ orders: data });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch issues:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: "createOrder",
    value: function createOrder(newOrder) {
      var _this5 = this;

      fetch('/api/placedOrderDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (updatedOrder) {
            // updatedReview.created = new Date(updatedReview.created);
            // if (updatedReview.completionDate)
            //   updatedReview.completionDate = new Date(updatedReview.completionDate);
            var newOrder = _this5.state.orders.concat(updatedOrder);
            _this5.setState({ orders: newOrder });
          });
        } else {
          res.json().then(function (error) {
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
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Menu"
        ),
        React.createElement(
          "h2",
          null,
          "These are the available options for grab and go today!"
        ),
        React.createElement(FoodTable, { foods: this.state.foods }),
        React.createElement("hr", null),
        React.createElement(
          "h1",
          null,
          "Place an Order!"
        ),
        React.createElement(
          "h2",
          null,
          "Fill out the form below"
        ),
        React.createElement(OrderAdd, { createOrder: this.createOrder }),
        React.createElement("hr", null),
        React.createElement(
          "h3",
          null,
          "Here are your current orders:"
        ),
        React.createElement(OrderTable, { orders: this.state.orders })
      );
    }
  }]);

  return OrderPage;
}(React.Component);

ReactDOM.render(React.createElement(OrderPage, null), contentNode);