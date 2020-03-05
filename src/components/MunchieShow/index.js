import React, { Component, useState, useEffect } from "react";
import axios from 'axios'
import "./index.css";
import { withRouter, Route, Switch, NavLink } from "react-router-dom";
import Camera from '../Camera'



function MunchieShow(props) {
  const [business, setBusiness] = useState([]);
  const [count, setCount] = useState(0);

  async function fetchData() {
    const id = props.match.params.id;
    console.log(id)
    axios(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        //to get the API from the .env file use process.env.{variable name}
        Authorization: `Bearer ${process.env.REACT_APP_YELP_APP_API_KEY}`
    },
    })
      .then(res => {
          console.log(res)
          setBusiness(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    
 
  }

  useEffect(() => {
    fetchData();
  }, []);


  console.log(business)

  return (
    <div class="card">
      <h1>{business.name}</h1> 
      <br></br>
      <div class="container">
        <img
          src={business.image_url}
          alt="munchie image"
          height="420"
          width="420"
        />
      </div>
      
      <p>Rating: {business.rating} out of 5 Stars</p>
      <p>{business.review_count} People Have Reviewed <strong>{business.name}</strong></p>
      <a href={business.url} target='blank'>More info on YELP</a><br></br>
      <button><NavLink exact to ={`/munchies/${business.id}/camera`}> Add More Photos to Share </NavLink></button>
    </div>
  );
}

/* class MovieShow extends Component{
    state={
        movie:{},
        count: 0,
    }
    async componentDidMount(){
        const movieId = this.props.match.params.id
        const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,)

        const movieJson=await movie.json();
        this.setState({movie: movieJson})

        console.log(this.props.match.params.id)
    }
    incrementMe = () => {
        let newCount = this.state.count + 1
        this.setState({
          count: newCount
        })
      }
    render(){
    console.log("Hello",this.props.user)
    return <div class="card"><h1>{this.state.movie.title}</h1><br></br><div class="container"><img src={`https://image.tmdb.org/t/p/original${this.state.movie.poster_path}`} alt="movie poster" height="420" width="420"/>
    <h5>Overview:</h5><p>{this.state.movie.overview}</p></div>
    <button disabled={this.props.user.email ? false : true} onClick={this.incrementMe}>♡ Likes: {this.state.count}</button>
    </div>
    }
} */

export default withRouter(MunchieShow);
