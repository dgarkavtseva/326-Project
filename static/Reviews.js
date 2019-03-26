"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reviews = [{
  name: "Joe Shmoe",
  created: new Date("2019-03-24"),
  time: "4:00pm",
  orderFrom: "Baby Berk 1",
  orderItem: "Hampshire Burger",
  driver: "Bob Bobert",
  review: "Food arrived warm, but in a open container, so the burger was tossed around and had fallen apart before it arrived"
}, {
  name: "Bob Bobert",
  created: new Date("2019-03-25"),
  time: "1:00pm",
  orderFrom: "Frank Grab & Go",
  orderItem: "Orange Chicken",
  driver: "Joe Shmoe",
  review: "Food arrived warm, and within 15 minutes of placing my order"
}];

var contentNode = document.getElementById("contents");

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "We will add a search bar here to searh for specific items."
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var ReviewRow = function ReviewRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.review.name
    ),
    React.createElement(
      "td",
      null,
      props.review.created.toDateString()
    ),
    React.createElement(
      "td",
      null,
      props.review.time
    ),
    React.createElement(
      "td",
      null,
      props.review.orderFrom
    ),
    React.createElement(
      "td",
      null,
      props.review.orderItem
    ),
    React.createElement(
      "td",
      null,
      props.review.driver
    ),
    React.createElement(
      "td",
      null,
      props.review.review
    )
  );
};

function ReviewTable(props) {
  var reviewRows = props.reviews.map(function (review) {
    return React.createElement(ReviewRow, { key: review.id, review: review });
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
          "Name"
        ),
        React.createElement(
          "th",
          null,
          "Date"
        ),
        React.createElement(
          "th",
          null,
          "Time"
        ),
        React.createElement(
          "th",
          null,
          "Ordered From"
        ),
        React.createElement(
          "th",
          null,
          "Order"
        ),
        React.createElement(
          "th",
          null,
          "Driver"
        ),
        React.createElement(
          "th",
          null,
          "Review"
        )
      )
    ),
    React.createElement(
      "tbody",
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
    key: "handleSubmit",
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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "reviewAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "name", placeholder: "Name" }),
          React.createElement("input", { type: "text", name: "time", placeholder: "Time" }),
          React.createElement("input", { type: "text", name: "orderFrom", placeholder: "Ordered From" }),
          React.createElement("input", { type: "text", name: "orderItem", placeholder: "Order" }),
          React.createElement("input", { type: "text", name: "driver", placeholder: "Driver" }),
          React.createElement("input", { type: "text", name: "review", placeholder: "Review" }),
          React.createElement(
            "button",
            null,
            "Add"
          )
        )
      );
    }
  }]);

  return ReviewAdd;
}(React.Component);

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
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this4 = this;

      setTimeout(function () {
        _this4.setState({
          reviews: reviews
        });
      }, 500);
    }
  }, {
    key: "createReview",
    value: function createReview(newReview) {
      var newReviews = this.state.reviews.slice();
      newReview.id = this.state.reviews.length + 1;
      newReviews.push(newReview);
      this.setState({ reviews: newReviews });
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
          "Reviews"
        ),
        React.createElement(SearchBar, null),
        React.createElement("hr", null),
        React.createElement(ReviewTable, { reviews: this.state.reviews }),
        React.createElement("hr", null),
        React.createElement(ReviewAdd, { createReview: this.createReview })
      );
    }
  }]);

  return ReviewList;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(ReviewList, null), contentNode);