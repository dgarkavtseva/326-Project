'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('isomorphic-fetch');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'We will add a search bar here to searh for specific items.'
      );
    }
  }]);

  return SearchBar;
}(_react2.default.Component);

var ReviewRow = function ReviewRow(props) {
  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        _reactRouter.Link,
        { to: '/reviews/' + props.review._id },
        props.review._id.substr(-4)
      )
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.name
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.created.toDateString()
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.time
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.orderFrom
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.orderItem
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.driver
    ),
    _react2.default.createElement(
      'td',
      null,
      props.review.review
    )
  );
};

function ReviewTable(props) {
  var reviewRows = props.reviews.map(function (review) {
    return _react2.default.createElement(ReviewRow, { key: review.id, review: review });
  });
  return _react2.default.createElement(
    'table',
    { className: 'bordered-table' },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Name'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Date'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Time'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Ordered From'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Order'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Driver'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Review'
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      reviewRows
    )
  );
}

var ReviewAdd = function (_React$Component2) {
  _inherits(ReviewAdd, _React$Component2);

  function ReviewAdd() {
    _classCallCheck(this, ReviewAdd);

    var _this2 = _possibleConstructorReturn(this, (ReviewAdd.__proto__ || Object.getPrototypeOf(ReviewAdd)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(ReviewAdd, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.reviewAdd;
      this.props.createReview({
        name: form.name.value,
        time: form.time.value,
        orderFrom: form.orderFrom.value,
        orderItem: form.orderItem.value,
        driver: form.driver.value,
        review: form.review.value,
        created: new Date()
      });
      // Clear the form for the next input.
      form.name.value = '';
      form.time.value = '';
      form.orderFrom.value = '';
      form.orderItem.value = '';
      form.driver.value = '';
      form.review.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { name: 'reviewAdd', onSubmit: this.handleSubmit },
          _react2.default.createElement('input', { type: 'text', name: 'name', placeholder: 'Name' }),
          _react2.default.createElement('input', { type: 'text', name: 'time', placeholder: 'Time' }),
          _react2.default.createElement('input', { type: 'text', name: 'orderFrom', placeholder: 'Ordered From' }),
          _react2.default.createElement('input', { type: 'text', name: 'orderItem', placeholder: 'Order' }),
          _react2.default.createElement('input', { type: 'text', name: 'driver', placeholder: 'Driver' }),
          _react2.default.createElement('input', { type: 'text', name: 'review', placeholder: 'Review' }),
          _react2.default.createElement(
            'button',
            null,
            'Add'
          )
        )
      );
    }
  }]);

  return ReviewAdd;
}(_react2.default.Component);

var ReviewList = function (_React$Component3) {
  _inherits(ReviewList, _React$Component3);

  function ReviewList() {
    _classCallCheck(this, ReviewList);

    var _this3 = _possibleConstructorReturn(this, (ReviewList.__proto__ || Object.getPrototypeOf(ReviewList)).call(this));

    _this3.state = { reviews: [] };

    _this3.createReview = _this3.createReview.bind(_this3);
    return _this3;
  }

  _createClass(ReviewList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var oldQuery = prevProps.location.query;
      var newQuery = this.props.location.query;
      if (oldQuery.status === newQuery.status) {
        return;
      }
      this.loadData();
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _this4 = this;

      fetch('/api/reviews' + this.props.location.search).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(function (review) {
              review.created = new Date(review.created);
              if (review.completionDate) review.completionDate = new Date(review.completionDate);
            });
            _this4.setState({ reviews: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch reviews:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: 'createReview',
    value: function createReview(newReview) {
      var _this5 = this;

      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (updatedReview) {
            updatedReview.created = new Date(updatedReview.created);
            if (updatedReview.completionDate) updatedReview.completionDate = new Date(updatedReview.completionDate);
            var newReview = _this5.state.reviews.concat(updatedReview);
            _this5.setState({ reviews: newReviews });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add review: ' + error.message);
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Reviews'
        ),
        _react2.default.createElement(SearchBar, null),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(ReviewTable, { reviews: this.state.reviews }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(ReviewAdd, { createReview: this.createReview })
      );
    }
  }]);

  return ReviewList;
}(_react2.default.Component);

IssueList.propTypes = {
  location: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object
};

// This renders the JSX component inside the content node:
//ReactDOM.render(<ReviewList />, contentNode);