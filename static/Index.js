'use strict';

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
        key: 'submitForm',
        value: function submitForm(event) {
            event.preventDefault();
            this.setState({ submitted: true });
            var form = document.forms.addUserForm;
            this.createUser({
                fname: form.fname.value,
                lname: form.lname.value,
                email: form.email.value
            });
            emailForm.fname.value = '';
            emailForm.lname.value = '';
            emailForm.email.value = '';
        }
    }, {
        key: 'createUser',
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                _defineProperty({ name: 'addUserForm', onSubmit: this.handleSubmit, id: 'emailForm' }, 'id', 'emailForm'),
                React.createElement(
                    'div',
                    { className: 'forms' },
                    React.createElement(
                        'h4',
                        null,
                        'Sign up now!'
                    ),
                    React.createElement('input', { type: 'text', name: 'fname', placeholder: 'First Name', value: this.state.text }),
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'lname', placeholder: 'Last Name', value: this.state.text }),
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'email', placeholder: 'Email', value: this.state.text }),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        null,
                        'Submit'
                    ),
                    this.state.submitted ? React.createElement(
                        'p',
                        null,
                        'Thanks!'
                    ) : React.createElement('div', null)
                )
            );
        }
    }]);

    return UserForm;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(UserForm, null), contentNode);