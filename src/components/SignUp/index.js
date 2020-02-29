import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Firebase from '../Firebase/firebase';
import {Wrapper, Form} from '../SignUp/style'
class Signup extends Component {
    state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        isAuth: false,
        error: null,
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleFormSubmit = async (e) => {
        const { email, passwordOne, username } = this.state
        e.preventDefault();
        try {
            await Firebase.doCreateUserWithEmailAndPassword(
                email,
                passwordOne,
            );
        this.props.doSetCurrentUser({
            username,
            email,
        })
        this.setState({ isAuth: true });
        } catch(error) {
            this.setState({
                error,
            });
            setTimeout(() => {
                this.setState({
                    error: null,  
                });
            }, 3000);
        }
        Firebase.doCreateUserWithEmailAndPassword(
            email, 
            passwordOne,
            ).then(res => console.log(res));
    }
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAuth,
            error,
        } = this.state;
        const isInvalid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' ||
            email === '' ||
            username === '';
        if(isAuth) {
            return <Redirect to='/' />
        }
    return(
        <Wrapper>
        <div>
            <h1>SIGN UP</h1>
            <Form onSubmit={this.handleFormSubmit}>
                <input 
                    placeholder='Full Name' 
                    name='username' 
                    value={username} 
                    onChange={this.handleChange} 
                />
                <input 
                    placeholder='Email' 
                    name='email' 
                    value={email} 
                    onChange={this.handleChange}    
                />
                <input 
                    placeholder='Password' 
                    type='password' 
                    name='passwordOne' 
                    value={passwordOne} 
                    onChange={this.handleChange}  
                />
                <input 
                    placeholder='Confirm Password' 
                    type='password' 
                    name='passwordTwo' 
                    value={passwordTwo} 
                    onChange={this.handleChange}  
                />
                <button disabled={isInvalid} type='submit'>Submit</button>
            </Form>
            {
                error && <div style={{color: 'red'}}>{error.message}</div>
            }
        </div>
        </Wrapper>
    )
    };
};
export default withRouter(Signup);