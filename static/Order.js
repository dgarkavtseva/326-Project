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

function FoodTable(props) {
  console.log("foodRows Start");
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

var OrderAdd = function (_React$Component3) {
  _inherits(OrderAdd, _React$Component3);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this3 = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    return _this3;
  }

  _createClass(OrderAdd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.loadData();
    }
  }, {
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

var OrderPage = function (_React$Component4) {
  _inherits(OrderPage, _React$Component4);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this4 = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    console.log("constructor");
    _this4.state = { foods: [], orders: [] };
    console.log("cons complete");
    _this4.createOrder = _this4.createOrder.bind(_this4);
    return _this4;
  }

  _createClass(OrderPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("mounted");
      console.log("mounted");

      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this5 = this;

      fetch('/order/orderDB').then(function (response) {
        console.log(response);
        console.log("loading");
        if (response.ok) {
          response.json().then(function (data) {
            console.log("data at 1");
            console.log(data);
            _this5.state = { foods: data };
            _this5.setState({ foods: data });
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
    key: "createItem",
    value: function createItem(newFood) {
      var newFoods = this.state.foods.slice();
      newFood.order = this.state.foods.length + 1;
      newFoods.push(newFood);
      this.setState({ foods: newFoods });
    }
  }, {
    key: "createOrder",
    value: function createOrder(newOrder) {
      if (newOrder.orderNumber != "" && newOrder.deliveryAdress != "") {
        var newOrders = this.state.orders.slice();
        newOrder.order = this.state.orders.length + 1;
        newOrders.push(newOrder);
        this.setState({ orders: newOrders });
      }
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