"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var UserForm = function (_React$Component) {
    _inherits(UserForm, _React$Component);

    function UserForm() {
        _classCallCheck(this, UserForm);

        var _this = _possibleConstructorReturn(this, (UserForm.__proto__ || Object.getPrototypeOf(UserForm)).call(this));

        _this.state = { submitted: false, users: [] };
        _this.handleSubmit = _this.submitForm.bind(_this);
        _this.createUser = _this.createUser.bind(_this);
        return _this;
    }

    _createClass(UserForm, [{
        key: "submitForm",
        value: function submitForm(event) {
            event.preventDefault();
            var form = document.forms.addUserForm;
            //check that all fields are filled out
            if (form.fname.value != "" && form.lname.value != "" && form.email.value != "") {
                this.setState({ submitted: true });
                this.createUser({
                    fname: form.fname.value,
                    lname: form.lname.value,
                    email: form.email.value
                });
                emailForm.fname.value = '';
                emailForm.lname.value = '';
                emailForm.email.value = '';
            }
        }
    }, {
        key: "createUser",
        value: function createUser(newUser) {
            var _this2 = this;

            fetch('/api/usersDB', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (updatedUser) {
                        var newUser = _this2.state.users.concat(updatedUser);
                        _this2.setState({ reviews: newUser });
                    });
                } else {
                    res.json().then(function (error) {
                        alert('Failed to add user ' + error.message);
                    });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                _defineProperty({ name: "addUserForm", onSubmit: this.handleSubmit, id: "emailForm" }, "id", "emailForm"),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                        "h4",
                        null,
                        "Sign up for our email list!"
                    ),
                    React.createElement(
                        "h5",
                        null,
                        "You must fill out all fields in the form."
                    ),
                    React.createElement("input", { type: "text", className: "form-control", name: "fname", placeholder: "First Name", value: this.state.text })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { type: "text", className: "form-control", name: "lname", placeholder: "Last Name", value: this.state.text })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { type: "text", className: "form-control", name: "email", placeholder: "Email", value: this.state.text }),
                    this.state.submitted ? React.createElement(
                        "p",
                        null,
                        "Thanks!"
                    ) : React.createElement("div", null),
                    React.createElement(
                        "button",
                        { className: "btn btn-outline-dark btn-lg" },
                        "Submit"
                    )
                )
            );
        }
    }]);

    return UserForm;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(UserForm, null), contentNode);
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