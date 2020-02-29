import React, { Component, useState, useEffect } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import { getMovieById } from "../../services/movieService";

function MovieShow(props) {
  const [movie, setMovie] = useState({});
  const [count, setCount] = useState(0);

  async function fetchData() {
    const movieId = props.match.params.id;
    const movieResult = await getMovieById(movieId);
    setMovie(movieResult);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="card">
      <h1>{movie.title}</h1>
      <br></br>
      <div class="container">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="movie poster"
          height="420"
          width="420"
        />
        <h5>Overview:</h5>
        <p>{movie.overview}</p>
      </div>
      <button
        disabled={props.user.email ? false : true}
        onClick={()=>setCount(count+1)}
      >
        ♡ Likes: {count}
      </button>
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

export default withRouter(MovieShow);
