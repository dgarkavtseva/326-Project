const issues = [
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

class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the ReviewFilter.</div>;
  }
}

const IssueRow = (props) => (
  <tr>
    <td>{props.issue.name}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.time}</td>
    <td>{props.issue.orderFrom}</td>
    <td>{props.issue.orderItem}</td>
    <td>{props.issue.driver}</td>
    <td>{props.issue.review}</td>
  </tr>
);

function IssueTable(props) {
  const issueRows = props.issues.map(issue => (
    <IssueRow key={issue.id} issue={issue} />
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
      <tbody>{issueRows}</tbody>
    </table>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.issueAdd;
    this.props.createIssue({
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
        <form name="issueAdd" onSubmit={this.handleSubmit}>
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

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };

    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        issues: issues
      });
    }, 500);
  }

  createIssue(newIssue) {
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }

  render() {
    return (
      <div>
        <h1>Reviews</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<IssueList />, contentNode);
