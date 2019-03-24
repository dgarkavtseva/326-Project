const contentNode = document.getElementById('contents');

const issues = [
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

class Menu extends React.Component {
  render() {
    return (
      <div>These are the available options for grab and go today!</div>
    ); 
  }
}

class IssueTable extends React.Component {
  render() {
    const itemRows = this.props.issues.map(issue => <ItemRow
    key={issue.order} issue={issue} />)
    
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Option Number</th>
            <th>Food</th>
            <th>Dining Hall</th>
          </tr>
        </thead>
        <tbody>{itemRows}</tbody>
      </table>
    )
  }
}


class ItemsList extends React.Component {
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <Menu />
        <hr />
        <IssueTable issues={issues}/>
        
      </div>
    ); 
  }
}




class ItemRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.order}</td>
        <td>{issue.food}</td>
        <td>{issue.diningHall}</td>
      </tr>
    )
  }
}

ReactDOM.render(<ItemsList />, contentNode);
