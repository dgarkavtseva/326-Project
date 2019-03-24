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

var orders = [];

var IssueRow = function (_React$Component) {
  _inherits(IssueRow, _React$Component);

  function IssueRow() {
    _classCallCheck(this, IssueRow);

    return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
  }

  _createClass(IssueRow, [{
    key: 'render',
    value: function render() {
      var issue = this.props.issue;
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          issue.order
        ),
        React.createElement(
          'td',
          null,
          issue.food
        ),
        React.createElement(
          'td',
          null,
          issue.diningHall
        )
      );
    }
  }]);

  return IssueRow;
}(React.Component);

var ItemTable = function (_React$Component2) {
  _inherits(ItemTable, _React$Component2);

  function ItemTable() {
    _classCallCheck(this, ItemTable);

    return _possibleConstructorReturn(this, (ItemTable.__proto__ || Object.getPrototypeOf(ItemTable)).apply(this, arguments));
  }

  _createClass(ItemTable, [{
    key: 'render',
    value: function render() {
      var issueRows = this.props.foods.map(function (issue) {
        return React.createElement(IssueRow, { key: issue.id, issue: issue });
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
          issueRows
        )
      );
    }
  }]);

  return ItemTable;
}(React.Component);

var Order = function (_React$Component3) {
  _inherits(Order, _React$Component3);

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

var IssueList = function (_React$Component4) {
  _inherits(IssueList, _React$Component4);

  function IssueList() {
    _classCallCheck(this, IssueList);

    var _this4 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

    _this4.state = { foods: foods, orders: orders };
    setTimeout(_this4.createItem.bind(_this4), 2000);
    return _this4;
  }

  _createClass(IssueList, [{
    key: 'createNew',
    value: function createNew(newIssue) {
      var newIssues = this.state.foods.slice();
      newIssue.order = this.state.foods.length + 1;
      newIssues.push(newIssue);
      this.setState({ foods: newIssues });
    }
  }, {
    key: 'createItem',
    value: function createItem() {
      this.createNew({
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
        React.createElement(ItemTable, { foods: this.state.foods }),
        React.createElement('hr', null),
        React.createElement(Order, null),
        React.createElement('hr', null),
        React.createElement(ItemTable, { foods: this.state.foods })
      );
    }
  }]);

  return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode);