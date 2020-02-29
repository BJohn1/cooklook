import React from 'react'

import './home.css';


const Home = () =>(
    <div>
        Home
    </div>
)


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