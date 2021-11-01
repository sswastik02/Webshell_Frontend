import axios from 'axios';
import React, { Component } from 'react';
import "./login.css"
import warning from "../../assets/warning.png"
class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {username: '',password:'',error:'',passerror:false};
  
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUsername(event) {
    
      this.setState({username:event.target.value});
    }
    handleChangePassword(event){
        
        this.setState({password:event.target.value});
    }
  
    handleSubmit(event) {
      axios.post('http://127.0.0.1:8000/api/rest-auth/login/',{
        "username": this.state.username,
        "email": "",
        "password": this.state.password
    }).then(
          res => {
              console.log(res.data.key)
              this.props.renderLogin(res.data.key,this.state.username)
          }
      ).catch(err=>{
          console.log(err.response.data)
          if(err.response.data.hasOwnProperty('password')){
              this.setState({error:err.response.data.password,passerror:true})
          }
          if(err.response.data.hasOwnProperty('non_field_errors')){
            this.setState({error:err.response.data.non_field_errors[0],passerror:false})
        }
        })
      event.preventDefault();
    }
    handlePasswordError(){
      if(this.state.passerror){
        return <img src={warning} alt="" width="15px" style={{marginRight:"20px"}}/>
      }
      return <React.Fragment/>
    }
    handleError(){
      if(this.state.error === ''){
        return <React.Fragment/>
      }
      return <React.Fragment>
        <img src={warning} alt="" width="15px" style={{marginRight:"20px"}}/>
        <div style={{color:"red",display:"inline"}}>Error: {this.state.error} </div>
      </React.Fragment>
    }
  
    render() {
      return (
          <div className="Login">
        <h1 className="loginheading">Login</h1>
        <form onSubmit={this.handleSubmit} className="loginForm">
            <div className="username">
          <label>
              <div className="usernametext">
              Username:
              </div>
            
            <input type="text" value={this.state.username} onChange={this.handleChangeUsername} className="usernamefield" />
          </label> 
          </div><br/>
          <div className="password">
            {this.handlePasswordError()}
          <label>
              <div className="passwordtext">
              Password:
              </div>
            
            <input type="password" value={this.state.password} onChange={this.handleChangePassword} className="passwordfield" /><br/>
            {this.handleError()}
          </label> 
          </div><br/>
          <input type="submit" value="Submit" className="loginsubmit"/>
        </form>
        </div>
      );
    }
  }
 
export default Login;