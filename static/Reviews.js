"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

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
    return React.createElement(ReviewRow, { key: review._id, review: review });
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

var ReviewAdd = function (_React$Component) {
  _inherits(ReviewAdd, _React$Component);

  function ReviewAdd() {
    _classCallCheck(this, ReviewAdd);

    var _this = _possibleConstructorReturn(this, (ReviewAdd.__proto__ || Object.getPrototypeOf(ReviewAdd)).call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(ReviewAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.reviewAdd;
      //check that all fields are filled out
      if (form.name.value != "" && form.time.value != "" && form.orderFrom.value != "" && form.orderItem.value != "" && form.driver.value != "" && form.review.value != "") {
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
            { className: "btn btn-outline-dark" },
            "Add"
          )
        )
      );
    }
  }]);

  return ReviewAdd;
}(React.Component);

var ReviewList = function (_React$Component2) {
  _inherits(ReviewList, _React$Component2);

  function ReviewList() {
    _classCallCheck(this, ReviewList);

    var _this2 = _possibleConstructorReturn(this, (ReviewList.__proto__ || Object.getPrototypeOf(ReviewList)).call(this));

    _this2.state = { reviews: [] };

    _this2.createReview = _this2.createReview.bind(_this2);
    return _this2;
  }

  _createClass(ReviewList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this3 = this;

      fetch('/api/reviewDB').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(function (review) {
              review.created = new Date(review.created);
              if (review.completionDate) review.completionDate = new Date(review.completionDate);
            });
            _this3.setState({ reviews: data.records });
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
    key: "createReview",
    value: function createReview(newReview) {
      var _this4 = this;

      fetch('/api/reviewDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (updatedReview) {
            updatedReview.created = new Date(updatedReview.created);
            if (updatedReview.completionDate) updatedReview.completionDate = new Date(updatedReview.completionDate);
            var newReview = _this4.state.reviews.concat(updatedReview);
            _this4.setState({ reviews: newReview });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add review: ' + error.message);
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
          "Reviews"
        ),
        React.createElement(ReviewTable, { reviews: this.state.reviews }),
        React.createElement("hr", null),
        React.createElement(
          "h3",
          null,
          "Add a Review by filling out all fields in the form!"
        ),
        React.createElement(ReviewAdd, { createReview: this.createReview })
      );
    }
  }]);

  return ReviewList;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(ReviewList, null), contentNode);

//notifications
var existingLength = -1;
var currLength = -1;
function refresh() {
  console.log("inf");
  fetch('/api/OrdersDB').then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        currLength = data.length;
      });
    } else {
      response.json().then(function (error) {
        alert("Failed to fetch issues:" + error.message);
      });
    }
  }).catch(function (err) {});

  if (existingLength === -1) {
    existingLength = currLength; //prevents notification on load
  }
  if (currLength != existingLength) {
    existingLength = currLength;
    sendNotification();
  }
  setTimeout(refresh, 500);
}
setTimeout(refresh, 4000);

function sendNotification() {
  var mobile = false;
  if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1) {
    //mobile detectoin strategy found here: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    alert("A new order has been placed!");
  } else {
    var notificationContent = {
      title: 'Dine Online',
      message: 'A new order has been placed!',
      icon: 'truck.png'
    };
    var sendNotification = function sendNotification() {
      var notification = new Notification('Dine Online', {
        icon: 'truck.png',
        body: 'A new order has been placed!'
      });
    };
    if (window.Notification) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      sendNotification();
    }
  }
} ////end notifications