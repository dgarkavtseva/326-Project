const reviews = [
  {
    name: "Joe Shmoe",
    created: new Date("2019-03-24"),
    time: "4:00pm",
    orderFrom: "Baby Berk 1",
    orderItem: "Hampshire Burger",
    driver: "Bob Bobert",
    review: "Food arrived warm, but in a open container, so the burger was tossed around and had fallen apart before it arrived"
  },
  {
    name: "Bob Bobert",
    created: new Date("2019-03-25"),
    time: "1:00pm",
    orderFrom: "Frank Grab & Go",
    orderItem: "Orange Chicken",
    driver: "Joe Shmoe",
    review: "Food arrived warm, and within 15 minutes of placing my order"
  }
];

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
    <ReviewRow key={review.id} review={review} />
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
    setTimeout(() => {
      this.setState({
        reviews: reviews
      });
    }, 500);
  }

  createReview(newReview) {
    const newReviews = this.state.reviews.slice();
    newReview.id = this.state.reviews.length + 1;
    newReviews.push(newReview);
    this.setState({ reviews: newReviews });
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
