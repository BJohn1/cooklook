import React, { useState, Component } from 'react'
import Navbar from './components/Navbar'
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SearchForm from './components/SearchForm';
import PasswordForgetLink from "./components/PasswordForget";



class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false,
    searchLocationQuery: null
  };
  doSetCurrentUser = (currentUser) => {
    console.log(currentUser)
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true : false,
    })
  };

  onFormSubmit = (searchLocationQuery) => {
    this.setState({
      searchLocationQuery: searchLocationQuery
    })
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
    } = this.state
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser} />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' render={()=> <Login doSetCurrentUser={this.doSetCurrentUser}/>} />
        <Route exact path='/signup' render={()=> <SignUp doSetCurrentUser={this.doSetCurrentUser}/>} />
        <Route exact path='/password-forget' component={PasswordForgetLink} />
        <Route exact path='/munchies/search' render={()=> <SearchForm onFormSubmit={this.onFormSubmit}/>}/>
      </Switch>
    </div>
  );
  }
}
export default App;