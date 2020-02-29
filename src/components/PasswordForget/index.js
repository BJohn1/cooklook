import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../Firebase/firebase'

class PasswordForgetForm extends Component{
    state={
        email:'',
        error:null,
    };

    onSubmit = async e =>{
        e.preventDefault();
        console.log('hit');
        try {
          await Firebase.doPasswordReset(this.state.email);  
        } catch (error) {
            console.log(error);
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    
    render(){
        return ( 
        <form onSubmit={this.onSubmit}>
            <input name='email' value={this.state.email} onChange={this.onChange} placeholder='Email Address'/> 
            <button type='submit'>Reset My Password</button>  
        </form>
        );
    }
}

export const PasswordForgetLink = () => <p>
    <Link to='/password-forget'>I Forgot My Password</Link>
</p>

export default PasswordForgetForm