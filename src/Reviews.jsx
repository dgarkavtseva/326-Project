var contentNode = document.getElementById("contents");

class SearchBar extends React.Component {
  render() {
    return <div>We will add a search bar here to searh for specific items.</div>;
  }
}

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
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Ordered From</th>
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

  render() {
    return (
      <div>
        <form name="reviewAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="time" placeholder="Time" />
          <input type="text" name="orderFrom" placeholder="Ordered From" />
          <input type="text" name="orderItem" placeholder="Order" />
          <input type="text" name="driver" placeholder="Driver" />
          <input type="text" name="review" placeholder="Review" />
          <button>Add</button>
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
        <SearchBar />
        <hr />
        <ReviewTable reviews={this.state.reviews} />
        <hr />
        <ReviewAdd createReview={this.createReview} />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<ReviewList />, contentNode);
