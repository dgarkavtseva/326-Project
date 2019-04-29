var contentNode = document.getElementById("contents");


const ReviewRow = (props) => (
  <tr>
    <td>{props.review.name}</td>
    <td>{props.review.created.toDateString()}</td>
    <td>{props.review.time}</td>
    <td>{props.review.orderFrom}</td>
    <td>{props.review.orderItem}</td>
    <td>{props.review.driver}</td>
    <td>{props.review.review}</td>
  </tr>
);

function ReviewTable(props) {
  const reviewRows = props.reviews.map(review => (
    <ReviewRow key={review._id} review={review} />
  ));
  return (
    <table className="table table-hover table-striped table-light">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th width="15%">Ordered From</th>
          <th>Order</th>
          <th>Driver</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>{reviewRows}</tbody>
    </table>
  );
}

class ReviewAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.reviewAdd;
    //check that all fields are filled out
    if (form.name.value != "" && form.time.value != "" && form.orderFrom.value != "" && form.orderItem.value != "" && form.driver.value != "" && form.review.value != "") {
      this.props.createReview({
        name: form.name.value,
        time: form.time.value,
        orderFrom: form.orderFrom.value,
        orderItem: form.orderItem.value,
        driver: form.driver.value,
        review: form.review.value,
        created: new Date(),
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

  render() {
    return (
      <div>
        <form name="reviewAdd" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              <input type="text" className="form-control" name="name" placeholder="Name" />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="time" placeholder="Time" />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="orderFrom" placeholder="Ordered From" />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="orderItem" placeholder="Order" />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="driver" placeholder="Driver" />
            </div>
            <div className="col">
              <input type="text" className="form-control" name="review" placeholder="Review" />
            </div>
            <br></br>
            <br></br>
          </div>
          <button className="btn btn-outline-dark">Add</button>
          <br></br>

        </form>
      </div>
    );
  }
}

class ReviewList extends React.Component {
  constructor() {
    super();
    this.state = { reviews: [] };

    this.createReview = this.createReview.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/reviewDB').then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          data.records.forEach(review => {
            review.created = new Date(review.created);
            if (review.completionDate)
              review.completionDate = new Date(review.completionDate);
          });
          this.setState({ reviews: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch reviews:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  createReview(newReview) {
    fetch('/api/reviewDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(updatedReview => {
              updatedReview.created = new Date(updatedReview.created);
              if (updatedReview.completionDate)
                updatedReview.completionDate = new Date(updatedReview.completionDate);
              const newReview = this.state.reviews.concat(updatedReview);
              this.setState({ reviews: newReview });
            });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add review: ' + error.message);
            });
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Reviews</h1>
        <br></br>
        <ReviewTable reviews={this.state.reviews} />
        <hr />
        <h3>Add a Review by filling out all fields in the form!</h3>
        <ReviewAdd createReview={this.createReview} />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<ReviewList />, contentNode);

//notifications
let existingLength = -1;
let currLength = -1;
function refresh() {
  console.log("inf");
  fetch('/api/OrdersDB').then(response => {
    if (response.ok) {
      response.json().then(data => {
        currLength = data.length;
      });
    } else {
      response.json().then(error => {
        alert("Failed to fetch issues:" + error.message)
      });
    }
  }).catch(err => {
  });

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
  let mobile = false;
  if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
    //mobile detectoin strategy found here: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    alert("A new order has been placed!");
  } else {
    let notificationContent = {
      title: 'Dine Online',
      message: 'A new order has been placed!',
      icon: 'truck.png',
    };
    var sendNotification = function () {
      var notification = new Notification('Dine Online', {
        icon: 'truck.png',
        body: 'A new order has been placed!'
      })
    }
    if (window.Notification) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      sendNotification()
    }
  }
}////end notifications 