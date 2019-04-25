"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

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
          "orderID"
        ),
        React.createElement(
          "th",
          null,
          "buyer"
        ),
        React.createElement(
          "th",
          null,
          "itemID"
        ),
        React.createElement(
          "th",
          null,
          "address"
        ),
        React.createElement(
          "th",
          null,
          "driver"
        ),
        React.createElement(
          "th",
          null,
          "status"
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

  _createClass(OrderAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var form = document.forms.orderAdd;
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
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "orderAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "orderID", placeholder: "OrderID" }),
          React.createElement("input", { type: "text", name: "driver", placeholder: "Your Name" }),
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

    _this2.state = { orders: [] };
    _this2.createOrder = _this2.createOrder.bind(_this2);
    return _this2;
  }

  _createClass(OrderPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadPlacedOrders();
    }
  }, {
    key: "loadPlacedOrders",
    value: function loadPlacedOrders() {
      var _this3 = this;

      fetch('/api/ordersDB').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            _this3.state = { orders: data }; //potential error
            _this3.setState({ orders: data });
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
      var _this4 = this;

      fetch('/api/ordersDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (updatedOrder) {
            var existingOrders = _this4.state.orders.slice();
            var exists = false;
            existingOrders.forEach(function match(element) {
              if (parseInt(element.orderID) === parseInt(updatedOrder.orderID)) {
                element.status = "Accepted";
                element.driver = updatedOrder.driver;
                exists = true;
              }
            });

            /*if (!exists) {
               existingOrders = this.state.orders.concat(updatedOrder);
             }*/
            _this4.setState({ orders: existingOrders });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add delivery: ' + error.message);
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
          "Claim an Order!"
        ),
        React.createElement(
          "h3",
          null,
          "Fill out all fields in the form below."
        ),
        React.createElement("hr", null),
        React.createElement(OrderAdd, { createOrder: this.createOrder }),
        React.createElement("hr", null),
        React.createElement(OrderTable, { orders: this.state.orders })
      );
    }
  }]);

  return OrderPage;
}(React.Component);

ReactDOM.render(React.createElement(OrderPage, null), contentNode);