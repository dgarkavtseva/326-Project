"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

var orders = [{
  order: "1", status: "pending", deliveryAddress: "elm"
}];

var OrderRow = function (_React$Component) {
  _inherits(OrderRow, _React$Component);

  function OrderRow() {
    _classCallCheck(this, OrderRow);

    return _possibleConstructorReturn(this, (OrderRow.__proto__ || Object.getPrototypeOf(OrderRow)).apply(this, arguments));
  }

  _createClass(OrderRow, [{
    key: "render",
    value: function render() {
      var order = this.props.order;
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          order.orderNumber
        ),
        React.createElement(
          "td",
          null,
          order.status
        ),
        React.createElement(
          "td",
          null,
          order.deliveryAdress
        )
      );
    }
  }]);

  return OrderRow;
}(React.Component);

var OrderTable = function (_React$Component2) {
  _inherits(OrderTable, _React$Component2);

  function OrderTable() {
    _classCallCheck(this, OrderTable);

    return _possibleConstructorReturn(this, (OrderTable.__proto__ || Object.getPrototypeOf(OrderTable)).apply(this, arguments));
  }

  _createClass(OrderTable, [{
    key: "render",
    value: function render() {
      var OrderRows = this.props.orders.map(function (order) {
        return React.createElement(OrderRow, { key: order.order, order: order });
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
          OrderRows
        )
      );
    }
  }]);

  return OrderTable;
}(React.Component);

var Order = function (_React$Component3) {
  _inherits(Order, _React$Component3);

  function Order() {
    _classCallCheck(this, Order);

    return _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).apply(this, arguments));
  }

  _createClass(Order, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Place an Order!"
        ),
        React.createElement(
          "h2",
          null,
          "Fill out the form below"
        )
      );
    }
  }]);

  return Order;
}(React.Component);

var OrderAdd = function (_React$Component4) {
  _inherits(OrderAdd, _React$Component4);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this4 = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
    return _this4;
  }

  _createClass(OrderAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
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

var OrderPage = function (_React$Component5) {
  _inherits(OrderPage, _React$Component5);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this5 = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    _this5.state = { orders: [] };
    _this5.createOrder = _this5.createOrder.bind(_this5);
    return _this5;
  }

  _createClass(OrderPage, [{
    key: "createOrder",
    value: function createOrder(newOrder) {
      var newOrders = this.state.orders.slice();
      newOrder.order = this.state.orders.length + 1;
      newOrders.push(newOrder);
      this.setState({ orders: newOrders });
      console.log(newOrders);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Order, null),
        React.createElement("hr", null),
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