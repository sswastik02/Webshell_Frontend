import React, { Component } from 'react';
import Navbar from './Navbar/navbar';
import Login from "./Login/login"
import "./app.css"
import Shell from './Shell/shell';
import axios from 'axios';
class App extends Component {
    state = {
        user:localStorage.getItem("user"),
        // token:"0cb8827e44e175c44411e23aa62a3bebce52bf25"
        token:localStorage.getItem('token')
    }
    componentDidMount(){
        if(this.state.user === null)
        {
        axios.get('http://127.0.0.1:8000/api/rest-auth/user/',{headers:{'Authorization': `Token ${this.state.token}`}}).then(
            res=>{
                this.renderUser(res.data.username)
            }
        ).catch(err=>{})
        }
        
    }
    handleLogout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.setState({
            user:null,
            token:null
        })
    }
    renderLogin = (token,user)=>{
        localStorage.setItem('token',token)
        localStorage.setItem('user',user)
        this.setState({
            user:user,
            token:token
        })
    }
    renderUser = (user) =>{
        this.setState({
            user:user
        })
    }
    render() {
        console.log(this.state.token)
        return <React.Fragment>
            <Navbar user={this.state.user} handleLogout={this.handleLogout}/>
            {(this.state.user === null)?<Login renderLogin = {this.renderLogin}/>:<Shell/>}
        </React.Fragment>;
    }
}
 
export default App;