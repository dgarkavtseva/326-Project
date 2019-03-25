'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

var foods = [{
  order: 1, food: 'Chicken Tenders', diningHall: 'Worcester'
}, {
  order: 2, food: 'Mac and Cheese', diningHall: 'Berk'
}, {
  order: 3, food: 'Orange Chicken', diningHall: 'Frank'
}, {
  order: 4, food: 'Sushi', diningHall: 'Worcester'
}];

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
    key: 'render',
    value: function render() {
      var food = this.props.food;
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          food.order
        ),
        React.createElement(
          'td',
          null,
          food.food
        ),
        React.createElement(
          'td',
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
    key: 'render',
    value: function render() {
      var order = this.props.order;
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          order.orderNumber
        ),
        React.createElement(
          'td',
          null,
          order.status
        ),
        React.createElement(
          'td',
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
    key: 'render',
    value: function render() {
      var foodRows = this.props.foods.map(function (food) {
        return React.createElement(FoodRow, { key: food.order, food: food });
      });
      return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Order Number'
            ),
            React.createElement(
              'th',
              null,
              'Food'
            ),
            React.createElement(
              'th',
              null,
              'Dining Hall'
            )
          )
        ),
        React.createElement(
          'tbody',
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
    key: 'render',
    value: function render() {
      var OrderRows = this.props.orders.map(function (order) {
        return React.createElement(OrderRow, { key: order.order, order: order });
      });
      return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Order Number'
            ),
            React.createElement(
              'th',
              null,
              'Status'
            ),
            React.createElement(
              'th',
              null,
              'Delivery Address'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          OrderRows
        )
      );
    }
  }]);

  return OrderTable;
}(React.Component);

var Order = function (_React$Component5) {
  _inherits(Order, _React$Component5);

  function Order() {
    _classCallCheck(this, Order);

    return _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).apply(this, arguments));
  }

  _createClass(Order, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Place an Order!'
        ),
        React.createElement(
          'h2',
          null,
          'Fill out the form below'
        )
      );
    }
  }]);

  return Order;
}(React.Component);

var OrderAdd = function (_React$Component6) {
  _inherits(OrderAdd, _React$Component6);

  function OrderAdd() {
    _classCallCheck(this, OrderAdd);

    var _this6 = _possibleConstructorReturn(this, (OrderAdd.__proto__ || Object.getPrototypeOf(OrderAdd)).call(this));

    _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
    return _this6;
  }

  _createClass(OrderAdd, [{
    key: 'handleSubmit',
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
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { name: 'orderAdd', onSubmit: this.handleSubmit },
          React.createElement('input', { type: 'text', name: 'orderNumber', placeholder: 'Order Number' }),
          React.createElement('input', { type: 'text', name: 'deliveryAdress', placeholder: 'Your Address' }),
          React.createElement(
            'button',
            null,
            'Add'
          )
        )
      );
    }
  }]);

  return OrderAdd;
}(React.Component);

var OrderPage = function (_React$Component7) {
  _inherits(OrderPage, _React$Component7);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this7 = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    _this7.state = { foods: foods, orders: [] };
    setTimeout(_this7.createFoods.bind(_this7), 2000);
    _this7.createOrder = _this7.createOrder.bind(_this7);
    return _this7;
  }

  _createClass(OrderPage, [{
    key: 'createItem',
    value: function createItem(newFood) {
      var newFoods = this.state.foods.slice();
      newFood.order = this.state.foods.length + 1;
      newFoods.push(newFood);
      this.setState({ foods: newFoods });
    }
  }, {
    key: 'createOrder',
    value: function createOrder(newOrder) {
      var newOrders = this.state.orders.slice();
      newOrder.order = this.state.orders.length + 1;
      newOrders.push(newOrder);
      this.setState({ orders: newOrders });
    }
  }, {
    key: 'createFoods',
    value: function createFoods() {
      this.createItem({
        order: 5,
        food: 'Pasta',
        diningHall: 'Hamp'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Menu'
        ),
        React.createElement(
          'h2',
          null,
          'These are the available options for grab and go today!'
        ),
        React.createElement(FoodTable, { foods: this.state.foods }),
        React.createElement('hr', null),
        React.createElement(Order, null),
        React.createElement('hr', null),
        React.createElement(OrderAdd, { createOrder: this.createOrder }),
        React.createElement('hr', null),
        React.createElement(
          'h3',
          null,
          'Here are your current orders:'
        ),
        React.createElement(OrderTable, { orders: this.state.orders })
      );
    }
  }]);

  return OrderPage;
}(React.Component);

ReactDOM.render(React.createElement(OrderPage, null), contentNode);