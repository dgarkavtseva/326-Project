"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

/*const foods = [
  {
    order: 1, food: 'Chicken Tenders', diningHall: 'Worcester',
  },
  {
    order: 2, food: 'Mac and Cheese', diningHall: 'Berk',
  },
  {
    order: 3, food: 'Orange Chicken', diningHall: 'Frank',
  },
  {
    order: 4, food: 'Sushi', diningHall: 'Worcester',   
  }
 ];*/

var orders = [{
  order: undefined, status: undefined, deliveryAddress: undefined
}];

var FoodRow = function (_React$Component) {
  _inherits(FoodRow, _React$Component);

  function FoodRow() {
    _classCallCheck(this, FoodRow);

    return _possibleConstructorReturn(this, (FoodRow.__proto__ || Object.getPrototypeOf(FoodRow)).apply(this, arguments));
  }

  _createClass(FoodRow, [{
    key: "render",
    value: function render() {
      var food = this.props.food;
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          food.order
        ),
        React.createElement(
          "td",
          null,
          food.food
        ),
        React.createElement(
          "td",
          null,
          food.diningHall
        )
      );
    }
  }]);

  return FoodRow;
}(React.Component);

var OrderRow = function (_React$Component2) {
  _inherits(OrderRow, _React$Component2);

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

var FoodTable = function (_React$Component3) {
  _inherits(FoodTable, _React$Component3);

  function FoodTable() {
    _classCallCheck(this, FoodTable);

    return _possibleConstructorReturn(this, (FoodTable.__proto__ || Object.getPrototypeOf(FoodTable)).apply(this, arguments));
  }

  _createClass(FoodTable, [{
    key: "render",
    value: function render() {
      var foodRows = this.props.foods.map(function (food) {
        return React.createElement(FoodRow, { key: food.order, food: food });
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
  }]);

  return FoodTable;
}(React.Component);

var OrderTable = function (_React$Component4) {
  _inherits(OrderTable, _React$Component4);

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

var OrderAdd = function (_React$Component5) {
  _inherits(OrderAdd, _React$Component5);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this5 = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this5.handleSubmit = _this5.handleSubmit.bind(_this5);
    return _this5;
  }

  _createClass(OrderAdd, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var oldQuery = prevProps.location.query;
      var newQuery = this.props.location.query;
      if (oldQuery.status === newQuery.status) {
        return;
      }
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this6 = this;

      // Note: React Router automatically adds a "location" property to a react
      //       object's "props". The object that the "location" property refers
      //       to also has a "search" property which is the query string of the
      //       URL, including the '?' character  -  which is why we do not need
      //       to add it to the string in the `fetch()` call.
      fetch("/order/orderDB" + this.props.location.search).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            //console.log("Total count of records:", data._metadata.total_count);
            // data.records.forEach(order => {
            //   order.created = new Date(issue.created);
            //   if (issue.completionDate)
            //     issue.completionDate = new Date(issue.completionDate);
            // });
            _this6.setState({ orders: data.records });
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
    key: "createOrder",
    value: function createOrder(newIssue) {
      var _this7 = this;

      fetch('/order/orderDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssue)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (updatedIssue) {
            // updatedIssue.created = new Date(updatedIssue.created);
            // if (updatedIssue.completionDate)
            //   updatedIssue.completionDate = new Date(updatedIssue.completionDate);
            // const newIssues = this.state.issues.concat(updatedIssue);
            _this7.setState({ orders: newIssues });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add issue: ' + error.message);
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

var OrderPage = function (_React$Component6) {
  _inherits(OrderPage, _React$Component6);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this8 = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    _this8.state = { foods: foods, orders: [] };
    _this8.createOrder = _this8.createOrder.bind(_this8);
    return _this8;
  }

  _createClass(OrderPage, [{
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
        )
      );
    }
  }]);

  return OrderPage;
}(React.Component);
// OrderList.propTypes = {
//   location: React.PropTypes.object.isRequired,
//   router: React.PropTypes.object,
// };


ReactDOM.render(React.createElement(OrderPage, null), contentNode);