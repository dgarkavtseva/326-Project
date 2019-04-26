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
                    <div className="form-group">
                        <h4>Sign up for our email list!</h4>
                        <h5>You must fill out all fields in the form.</h5>
                        <input type="text" className="form-control" name="fname" placeholder="First Name" value={this.state.text} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="lname" placeholder="Last Name" value={this.state.text} />
                        
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="email" placeholder="Email" value={this.state.text} />
                        
                        {this.state.submitted ? <p>Thanks!</p> : <div></div>}
                        <button className="btn btn-outline-dark btn-lg">Submit</button>                        
                    </div>
                </form>
        );
    }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<UserForm />, contentNode);
//notifications
let existingLength = -1;
let currLength = -1;
function refresh(){
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
  
    if (existingLength === -1){
      existingLength = currLength; //prevents notification on load
    }
     if (currLength != existingLength){
      existingLength = currLength;
      sendNotification();
    }
  setTimeout(refresh, 500);
}
setTimeout(refresh, 4000);





function sendNotification () {
  let mobile = false;
  if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){
    //mobile detectoin strategy found here: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
    alert("A new order has been placed!");
  }else{
    let notificationContent = {
    title: 'Dine Online',
    message: 'A new order has been placed!',
    icon:'truck.png',
    };
      var sendNotification = function (){
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

