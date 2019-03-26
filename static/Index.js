'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var MyComponent = function (_React$Component) {
    _inherits(MyComponent, _React$Component);

    function MyComponent() {
        _classCallCheck(this, MyComponent);

        var _this = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this));

        _this.state = { submitted: false };
        _this.handleSubmit = _this.submitForm.bind(_this);
        return _this;
    }

    _createClass(MyComponent, [{
        key: 'submitForm',
        value: function submitForm(event) {
            event.preventDefault();
            this.setState({ submitted: true });
            emailForm.firstName.value = '';
            emailForm.lastName.value = '';
            emailForm.email.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                _defineProperty({ name: 'temp', onSubmit: this.handleSubmit, id: 'emailForm' }, 'id', 'emailForm'),
                React.createElement(
                    'div',
                    { className: 'forms' },
                    React.createElement(
                        'h4',
                        null,
                        'Sign up now!'
                    ),
                    React.createElement('input', { type: 'text', name: 'firstName', placeholder: 'First Name', value: this.state.text }),
                    React.createElement('br', null),
                    React.createElement('input', { type: 'text', name: 'lastName', placeholder: 'Last Name', value: this.state.text }),
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

    return MyComponent;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(MyComponent, null), contentNode);