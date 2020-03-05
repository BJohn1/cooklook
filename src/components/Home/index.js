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


/* class Home extends Component{
    state={
        movies:[],
    }

    async componentDidMount(){
        const movies = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
            
        );
        const moviesJson = await movies.json();
        this.setState({
            movies: moviesJson.results,
        })
        console.log(moviesJson);
        console.log(movies);
    }
         
    render(){
        console.log(this.state)
        return <h4><ul>{this.state.movies.map((m,i)=>(
            <li><Link to={`/movies/${m.id}`}key={i}>{m.title}<br></br></Link><img class='image' src={`https://image.tmdb.org/t/p/original${m.poster_path}`} alt="movie poster" height="42" width="42"/></li>
        ))}</ul></h4>
    }
} */

export default Home;