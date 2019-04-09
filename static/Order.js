"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

// const foods = [
//   {
//     order: 1, food: 'Chicken Tenders', diningHall: 'Worcester',
//   },
//   {
//     order: 2, food: 'Mac and Cheese', diningHall: 'Berk',
//   },
//   {
//     order: 3, food: 'Orange Chicken', diningHall: 'Frank',
//   },
//   {
//     order: 4, food: 'Sushi', diningHall: 'Worcester',   
//   }
//  ];

// const orders = [
//   {
//     order: undefined, status: undefined, deliveryAddress: undefined,
//   }
// ];

// const FoodRow = (props) => (

//       <tr>
//         <td>{food._order}</td>
//         <td>{food.food}</td>
//         <td>{food.diningHall}</td>
//       </tr>
//     );

function FoodRow(props) {
  console.log("in foodrow function");
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      food._order
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

// class OrderRow extends React.Component {
//   render() {
//     const order = this.props.order;
//     return (
//       <tr>
//         <td>{order.orderNumber}</td>
//         <td>{order.status}</td>
//         <td>{order.deliveryAdress}</td>
//       </tr>
//     );
//   }
// }

function FoodTable(props) {
  console.log("foodRows Start");
  console.log(props);
  var foodRows = props.foods.map(function (food) {
    return React.createElement(FoodRow, { key: food._order, food: food });
  });
  console.log("foodRows");
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

// class OrderTable extends React.Component {
//   render() {
//     const OrderRows = this.props.orders.map(order => (
//       <OrderRow key={order.order} order={order} />
//     ));
//     return (
//       <table className="bordered-table">
//         <thead>
//           <tr>
//             <th>Order Number</th>
//             <th>Status</th>
//             <th>Delivery Address</th>
//           </tr>
//         </thead>
//         <tbody>{OrderRows}</tbody>
//       </table>
//     );
//   }
// }
/*class OrderAdd extends React.Component {
  constructor() {
    super();
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  handleSubmit(event) {
    event.preventDefault();
    let form = document.forms.orderAdd;
    this.props.createOrder({
      orderNumber: form.orderNumber.value, 
      deliveryAdress: form.deliveryAdress.value,
      status: 'Pending'
    });
    form.orderNumber.value = '';
    form.deliveryAdress.value = '';
  }

  render() {
    return (
      <div>
        <form name="orderAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="orderNumber" placeholder="Order Number" />
          <input type="text" name="deliveryAdress" placeholder="Your Address" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}*/

var OrderPage = function (_React$Component) {
  _inherits(OrderPage, _React$Component);

  function OrderPage() {
    _classCallCheck(this, OrderPage);

    var _this = _possibleConstructorReturn(this, (OrderPage.__proto__ || Object.getPrototypeOf(OrderPage)).call(this));

    console.log("constructor");
    _this.state = { foods: [] };
    console.log("cons complete");
    //this.createOrder = this.createOrder.bind(this);
    return _this;
  }

  _createClass(OrderPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("mounted");
      console.log("mounted");

      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this2 = this;

      fetch('/order/orderDB').then(function (response) {
        console.log(response);
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            //console.log("Total count of records:", data._metadata.total_count);
            // data.records.forEach(issue => {
            //   issue.created = new Date(issue.created);
            //   if (issue.completionDate)
            //     issue.completionDate = new Date(issue.completionDate);
            // });
            _this2.setState({ foods: data.records });
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
    key: "createItem",
    value: function createItem(newFood) {
      var newFoods = this.state.foods.slice();
      newFood.order = this.state.foods.length + 1;
      newFoods.push(newFood);
      this.setState({ foods: newFoods });
    }
    // createOrder(newOrder) {
    //   if(newOrder.orderNumber != "" && newOrder.deliveryAdress != ""){
    //     const newOrders = this.state.orders.slice();
    //     newOrder.order = this.state.orders.length + 1;
    //     newOrders.push(newOrder);
    //     this.setState({ orders: newOrders });
    //   }
    // }

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
        )
      );
    }
  }]);

  return OrderPage;
}(React.Component);

ReactDOM.render(React.createElement(OrderPage, null), contentNode);