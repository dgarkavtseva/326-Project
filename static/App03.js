'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var issues = [{
  id: 1, status: 'Open', owner: 'Ravan',
  created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
  title: 'Error in console when clicking Add'
}, {
  id: 2, status: 'Assigned', owner: 'Eddie',
  created: new Date('2016-08-16'), effort: 14,
  completionDate: new Date('2016-08-30'),
  title: 'Missing bottom border on panel'
}];

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'These are the available options for grab and go today!'
      );
    }
  }]);

  return Menu;
}(React.Component);

var IssueTable = function (_React$Component2) {
  _inherits(IssueTable, _React$Component2);

  function IssueTable() {
    _classCallCheck(this, IssueTable);

    return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
  }

  _createClass(IssueTable, [{
    key: 'render',
    value: function render() {
      var issueRows = this.props.issues.map(function (issue) {
        return React.createElement(IssueRow, {
          key: issue.id, issue: issue });
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
              'Id'
            ),
            React.createElement(
              'th',
              null,
              'Status'
            ),
            React.createElement(
              'th',
              null,
              'Owner'
            ),
            React.createElement(
              'th',
              null,
              'Created'
            ),
            React.createElement(
              'th',
              null,
              'Effort'
            ),
            React.createElement(
              'th',
              null,
              'Completion Date'
            ),
            React.createElement(
              'th',
              null,
              'Title'
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

  return IssueTable;
}(React.Component);

var ItemsList = function (_React$Component3) {
  _inherits(ItemsList, _React$Component3);

  function ItemsList() {
    _classCallCheck(this, ItemsList);

    return _possibleConstructorReturn(this, (ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).apply(this, arguments));
  }

  _createClass(ItemsList, [{
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
        React.createElement(Menu, null),
        React.createElement('hr', null),
        React.createElement(IssueTable, { issues: issues })
      );
    }
  }]);

  return ItemsList;
}(React.Component);

var IssueRow = function (_React$Component4) {
  _inherits(IssueRow, _React$Component4);

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
          issue.id
        ),
        React.createElement(
          'td',
          null,
          issue.status
        ),
        React.createElement(
          'td',
          null,
          issue.owner
        ),
        React.createElement(
          'td',
          null,
          issue.created.toDateString()
        ),
        React.createElement(
          'td',
          null,
          issue.effort
        ),
        React.createElement(
          'td',
          null,
          issue.completionDate ? issue.completionDate.toDateString() : ''
        ),
        React.createElement(
          'td',
          null,
          issue.title
        )
      );
    }
  }]);

  return IssueRow;
}(React.Component);

ReactDOM.render(React.createElement(ItemsList, null), contentNode);