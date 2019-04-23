
// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

class UserForm extends React.Component {
    constructor() {
        super();
        this.state = { submitted: false, users: []};
        this.handleSubmit = this.submitForm.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        let form = document.forms.addUserForm;
        //check that all fields are filled out
        if(form.fname.value != "" && form.lname.value != "" && form.email.value != ""){
            this.setState({ submitted: true });
            this.createUser({
                fname: form.fname.value,
                lname: form.lname.value,
                email: form.email.value,
            });
            emailForm.fname.value = '';
            emailForm.lname.value = '';
            emailForm.email.value = '';
        }
    }

    createUser(newUser) {
        fetch('/api/usersDB', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(updatedUser => {
                            const newUser = this.state.users.concat(updatedUser);
                            this.setState({ reviews: newUser });
                        });
                }
                else {
                    res.json()
                        .then(error => {
                            alert('Failed to add user ' + error.message);
                        });
                }
            });
    }

    render() {
        return (
                <form name="addUserForm" onSubmit={this.handleSubmit} id = "emailForm" id="emailForm">
                    <div className="forms">
                        <h4>Sign up for our email list!</h4>
                        <h5>You must fill out all fields in the form</h5>
                        <input type="text" name="fname" placeholder="First Name" value={this.state.text} />
                        <br></br>
                        <input type="text" name="lname" placeholder="Last Name" value={this.state.text} />
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
ReactDOM.render(<UserForm />, contentNode);
