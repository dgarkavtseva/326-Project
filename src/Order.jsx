
const contentNode = document.getElementById("contents");

const foods = [
  {
    order: 1, food: 'Chicken Tenders', diningHall: 'Worcester',
  },
  {
    order: 2, food: 'Mac and Cheese', diningHall: 'Berk',
  },
  {
    order: 3, food: 'Orange Chicken', diningHall: 'Frank',
  },
  {
    order: 4, food: 'Sushi', diningHall: 'Worcester',   
  },
 ];

 const orders = [
 ];
 
class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.order}</td>
        <td>{issue.food}</td>
        <td>{issue.diningHall}</td>
        
       
      </tr>
    );
  }
}

class ItemTable extends React.Component {
  render() {
    const issueRows = this.props.foods.map(issue => (
      <IssueRow key={issue.id} issue={issue} />
    ));
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Food</th>
            <th>Dining Hall</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

class Order extends React.Component {
  
  render() {
    return (
      <div>
        <h1>Place an Order!</h1>
        <h2>Fill out the form below</h2>
        
        
      </div>
    );  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { foods: foods, orders: orders };
    setTimeout(this.createItem.bind(this), 2000);
  }

  createNew(newIssue) {
    const newIssues = this.state.foods.slice();
    newIssue.order = this.state.foods.length + 1;
    newIssues.push(newIssue);
    this.setState({ foods: newIssues });
  }

  createItem() {
    this.createNew({
      order: 5,
      food: 'Pasta',
      diningHall: 'Hamp'
    });
  }

  render() {
    return (
      <div>
        <h1>Menu</h1>
        <h2>These are the available options for grab and go today!</h2>
        
        <ItemTable foods={this.state.foods} />
        <hr />
        <Order />
        <hr />
        <ItemTable foods={this.state.foods} />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
