import axios from "axios";
import React, { Component } from "react";
import "./navbar.css";
class Navbar extends Component {
  handleLogout = () =>{
    axios.post("http://127.0.0.1:8000/api/rest-auth/logout/").then(res=>{
      console.log(res.data)
      this.props.handleLogout()
    }).catch(err=>{})
  }
  renderAnonymous = () => {
    return (this.props.user  === null) ? (
      <React.Fragment>
        <div className="regbtncont">
          <button className="registerbtn">Register</button>
        </div>
        <div className="loginbtncont">
          <button className="loginbtn">Login</button>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment >
        <div className="logoutbtncont">
        <button className="logoutbtn" onClick={this.handleLogout}>Log out</button>
        </div>
      </React.Fragment>
    );
  };
  render() {
    return (
      <nav>
        {this.renderAnonymous()}
        <div className="User">
            {this.props.user}
        </div>
      </nav>
    );
  }
}

export default Navbar;
