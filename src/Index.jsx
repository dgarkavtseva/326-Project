
// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class MyComponent extends React.Component {


    constructor() {
        super();
        this.state = { submitted: false };
        this.handleSubmit = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        console.log("PEBIS");
        this.setState({submitted: true});
    }

    render() {
        return (
                <form name="temp" onSubmit={this.handleSubmit} id = "emailForm" id="emailForm">
                    <div className="forms">
                        <h4>Sign up now!</h4>
                        <input type="text" name="firstName" placeholder="First Name" value={this.state.text} />
                        <br></br>
                        <input type="text" name="lastName" placeholder="Last Name" value={this.state.text} />
                        <br></br>
                        <input type="text" name="email" placeholder="Email" value={this.state.text} />
                        <br></br>
                        <button>Submit</button>
                        {this.state.submitted ? <p>Thanks!</p> : <div></div>}
                    </div>
                </form>
        );
    }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<MyComponent />, contentNode);
