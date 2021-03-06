import React, { useState, Component } from 'react'
import Navbar from './components/Navbar'
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SearchForm from './components/SearchForm';
import PasswordForgetLink from "./components/PasswordForget";
import MunchieSearch from './components/MunchieSearch'
import MunchieShow from './components/MunchieShow'
import Camera from './components/Camera'
import './App.css'



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
      searchLocationQuery
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
        <Route exact path='/munchies/:id/camera' component={Camera} user={currentUser}/>
        <Route exact path='/munchies/camera' component={Camera} user={currentUser}/>
        <Route exact path='/munchies/:id' render={()=> <MunchieShow user={this.state.currentUser}/>} />
        {/* <MunchieSearch searchLocationQuery = {this.state.searchLocationQuery}/>   */}
      </Switch>
      {/* <SearchForm onFormSubmit={this.onFormSubmit}/>
      <MunchieSearch searchLocationQuery = {searchLocationQuery}/> */}
    </div>
  );
  }
}
export default App;