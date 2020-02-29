import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import Firebase from '../Firebase/firebase'

import { PasswordForgetLink } from '../PasswordForget'

class Login extends Component{
    state = {
        email: '',
        password1: '',
    };

    handleChange = (e) =>{
        this.setState({
        [e.target.name]: e.target.value,
    });
    console.log('clicked',e.target);
};

    handleFormSubmit = async e =>{
        const{email,password1}=this.state;
        e.preventDefault();
        try{
            await Firebase.doSignInWithEmailAndPassword(email,password1);
            this.props.doSetCurrentUser({
                email,
            });
            this.setState({
                isAuth:true,
            });
        }catch(error){
            console.log(error)
        }
        //const user = {
        //    email: this.state.email,
        //}
        //this.props.doSetCurrentUser(user);
        this.props.history.push('/');
    }

    render(){
        const{
            email,
            password1,
        } = this.state;
        const isInvalid = password1 === '' || email === '';
    
    return (
    <div>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
            <input placeholder='Email'name='email' value={email} onChange={this.handleChange}/>
            <br />
            <input placeholder='Password' type='password' name='password1' value={password1} onChange={this.handleChange}/>
            <button disabled={isInvalid} type='submit'>Submit</button>
        </form>
        <PasswordForgetLink/>
    </div>
    );
 }
};

export default withRouter(Login);