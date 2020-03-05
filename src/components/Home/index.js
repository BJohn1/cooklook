import React, { useState, Component } from 'react'
import SearchForm from '../SearchForm';
import MunchieSearch from '../MunchieSearch'
import './home.css';


class Home extends Component{
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
        
        <div id="row">
        <h1 id="heading">Where are you right now?</h1>
        <h4 id="strapline"><SearchForm onFormSubmit={this.onFormSubmit}/><MunchieSearch searchLocationQuery = {searchLocationQuery}/></h4>
        <span><a class="button" href="google.com" target="_blank">full demo</a></span>
      </div>
      ) 
    }
}




export default Home;