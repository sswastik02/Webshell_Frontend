import React, { Component } from 'react';
import axios from 'axios'
import "./register.css"
import warning from "../../assets/warning.png"
class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password1:'',
            password2:'',
            error:'',
        }
    
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword1 = this.handleChangePassword1.bind(this)
        this.handleChangePassword2 = this.handleChangePassword2.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeUsername(event) {
      
        this.setState({username:event.target.value});
      }
      handleChangePassword1(event){
          
          this.setState({password1:event.target.value});
      }
      handleChangePassword2(event){
          
        this.setState({password2:event.target.value});
    }
    
      handleSubmit(event) {
        axios.post('http://127.0.0.1:8000/api/rest-auth/registration/',{
          "username": this.state.username,
          "password1": this.state.password1,
          "password2": this.state.password2
      }).then(
            res => {
                console.log(res.data.key)
                this.props.renderLogin(res.data.key,this.state.username)
            }
        ).catch(err=>{
            console.log(err.response.data)
            if(err.response.data.hasOwnProperty('password1')){
                this.setState({error:err.response.data.password1})
                return
            }
            if(err.response.data.hasOwnProperty('password2')){
              this.setState({error:err.response.data.password2})
              return
          }
            if(err.response.data.hasOwnProperty('non_field_errors')){
              this.setState({error:err.response.data.non_field_errors[0]})
          }
        console.log(err.response)
          })  
        event.preventDefault();
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
        return <div className="register">
        <h1 className="registerheading">Register</h1>
        <form onSubmit={this.handleSubmit} className="registerForm">
            <div className="username">
          <label>
              <div className="usernametext">
              Username:
              </div>
            
            <input type="text" value={this.state.username} onChange={this.handleChangeUsername} className="usernamefield" />
          </label> 
          </div><br/>
          <div className="password">
          <label>
              <div className="password1text">
              Password:
              </div>
            
            <input type="password" value={this.state.password1} onChange={this.handleChangePassword1} className="password1field" /><br/>
          </label>
         
          </div><br/>
          <div className="confirmPassword">
         <label>
              <div className="password2text">
              Confirm Password:
              </div>
            
            <input type="password" value={this.state.password2} onChange={this.handleChangePassword2} className="password2field" /><br/>
            {this.handleError()}
          </label></div>  
          <br/>
          <input type="submit" value="Submit" className="registersubmit"/>
        </form>
        </div>
    }
}
 
export default Register;