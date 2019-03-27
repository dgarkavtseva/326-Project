"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");
var orders = [{
  orderNumber: "2", status: 'pending', deliveryAdress: "Elm", orderID: 50, Deliverer: "NA"
}, {
  orderNumber: "5", status: 'pending', deliveryAdress: "Van Meter", orderID: 51, Deliverer: "NA"
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
        ),
        React.createElement(
          "td",
          null,
          order.orderID
        ),
        React.createElement(
          "td",
          null,
          order.Deliverer
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
              "Menu Item"
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
            ),
            React.createElement(
              "th",
              null,
              "Order ID"
            ),
            React.createElement(
              "th",
              null,
              "Deliverer"
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

var OrderAdd = function (_React$Component3) {
  _inherits(OrderAdd, _React$Component3);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this3 = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    return _this3;
  }

  _createClass(OrderAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var form = document.forms.orderAdd;
      this.props.createOrder({
        Deliverer: form.deliveryAdress.value,
        orderID: form.orderNumber.value,
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
          React.createElement("input", { type: "text", name: "deliveryAdress", placeholder: "Name" }),
          React.createElement("input", { type: "text", name: "orderNumber", placeholder: "Order ID" }),
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

var OrderPage = function (_React$Component4) {
  _inherits(OrderPage, _React$Component4);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this4 = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    _this4.state = { orders: orders };
    setTimeout(_this4.createOrderInit.bind(_this4), 2000);
    _this4.createOrder = _this4.createOrder.bind(_this4);
    return _this4;
  }

  _createClass(OrderPage, [{
    key: "createOrder",
    value: function createOrder(newOrder) {
      if (newOrder.orderID != "" && newOrder.deliveryAdress != "") {
        var newOrders = this.state.orders.slice();
        var exists = false;
        newOrders.forEach(function match(element) {

          if (element.orderID * 2 / 2 === newOrder.orderID * 2 / 2) {
            element.status = "accepted";
            element.Deliverer = newOrder.Deliverer;
            exists = true;
          }
        });
        if (!exists) {
          newOrder.order = this.state.orders.length + 1;
          newOrders.push(newOrder);
        }
        this.setState({ orders: newOrders });
      }
    }
  }, {
    key: "createOrderInit",
    value: function createOrderInit() {
      this.createOrder({
        orderNumber: 1,
        status: "pending",
        deliveryAdress: "Maple",
        orderID: 52, Deliverer: "NA"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Select an order to fulfill"
        ),
        React.createElement("hr", null),
        React.createElement(
          "h3",
          null,
          "Current orders:"
        ),
        React.createElement(OrderTable, { orders: this.state.orders }),
        React.createElement(OrderAdd, { createOrder: this.createOrder })
      );
    }
  }]);

  return OrderPage;
}(React.Component);

ReactDOM.render(React.createElement(OrderPage, null), contentNode);