"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

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
      props.order.orderID
    ),
    React.createElement(
      "td",
      null,
      props.order.buyer
    ),
    React.createElement(
      "td",
      null,
      props.order.itemID
    ),
    React.createElement(
      "td",
      null,
      props.order.address
    ),
    React.createElement(
      "td",
      null,
      props.order.driver
    ),
    React.createElement(
      "td",
      null,
      props.order.status
    )
  );
};

function FoodTable(props) {
  var foodRows = props.foods.map(function (food) {
    return React.createElement(FoodRow, { key: food._id, food: food });
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
          "Order ID"
        ),
        React.createElement(
          "th",
          null,
          "Buyer"
        ),
        React.createElement(
          "th",
          null,
          "Item ID"
        ),
        React.createElement(
          "th",
          null,
          "Address"
        ),
        React.createElement(
          "th",
          null,
          "Driver"
        ),
        React.createElement(
          "th",
          null,
          "Status"
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

    _this.state = { currOrderID: 100 };
    _this.handleSubmit = _this.handleSubmit.bind(_this);

    return _this;
  }

  _createClass(OrderAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var form = document.forms.orderAdd;
      //check that all fields are filled out

      if (form.itemID.value != "" && form.address.value != "") {
        this.props.createOrder({
          itemID: form.itemID.value,
          orderID: this.state.currOrderID.toString(),
          address: form.address.value,
          status: 'Pending'
        });
        this.state.currOrderID++;
        form.itemID.value = '';
        form.address.value = '';
      }
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
          React.createElement("input", { type: "text", name: "itemID", placeholder: "Item Number" }),
          React.createElement("input", { type: "text", name: "address", placeholder: "Your Address" }),
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

    _this2.state = { foods: [], orders: [] };
    _this2.createOrder = _this2.createOrder.bind(_this2);
    return _this2;
  }

  _createClass(OrderPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
      this.loadPlacedOrders();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this3 = this;

      fetch('/api/menuDB').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
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

      fetch('/api/ordersDB').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
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

      fetch('/api/ordersDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      }).then(function (res) {
        if (res.ok) {
          var existingOrders = _this5.state.orders.slice();
          currLength = existingOrders.length;
          // console.log(existingOrders.length);
          res.json().then(function (updatedOrder) {
            var newOrder = _this5.state.orders.concat(updatedOrder);
            _this5.setState({ orders: newOrder });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add review: ' + error.message);
          });
        }
      });
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
        React.createElement(
          "center",
          null,
          React.createElement(FoodTable, { foods: this.state.foods })
        ),
        React.createElement("hr", null),
        React.createElement(
          "h1",
          null,
          "Place an Order!"
        ),
        React.createElement(
          "h2",
          null,
          "Fill out all fields in the form below."
        ),
        React.createElement(OrderAdd, { createOrder: this.createOrder }),
        React.createElement("hr", null),
        React.createElement(
          "h3",
          null,
          "Here are your current orders:"
        ),
        React.createElement(
          "center",
          null,
          React.createElement(OrderTable, { orders: this.state.orders })
        )
      );
    }
  }]);

  return OrderPage;
}(React.Component);

ReactDOM.render(React.createElement(OrderPage, null), contentNode);

//notifications
var existingLength = -1;
var currLength = -1;
function refresh() {
  console.log("inf");
  fetch('/api/OrdersDB').then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        currLength = data.length;
      });
    } else {
      response.json().then(function (error) {
        alert("Failed to fetch issues:" + error.message);
      });
    }
  }).catch(function (err) {});

  if (existingLength === -1) {
    existingLength = currLength; //prevents notification on load
  }
  if (currLength != existingLength) {
    existingLength = currLength;
    sendNotification();
  }
  setTimeout(refresh, 500);
}
setTimeout(refresh, 4000);

function sendNotification() {
  var mobile = false;
  if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1) {
    //mobile detectoin strategy found here: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    alert("A new order has been placed!");
  } else {
    var notificationContent = {
      title: 'Dine Online',
      message: 'A new order has been placed!',
      icon: 'truck.png'
    };
    var sendNotification = function sendNotification() {
      var notification = new Notification('Dine Online', {
        icon: 'truck.png',
        body: 'A new order has been placed!'
      });
    };
    if (window.Notification) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      sendNotification();
    }
  }
} ////end notifications