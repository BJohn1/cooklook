import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class MunchieSearch extends Component {

    constructor(props) {
        super(props);
        //props.state is linked with the result sending back from its child a.k.a the result we returned in SearchForm element
        this.state = {
        //leverage the state to store the information return from API to make loading faster
        results: [],
        errorState: null,
        loading: false,
        latitude: 0,
        longitude: 0
        };
    }
        
    componentDidMount () {
        this.getRestaurantsFromApi('');
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        
        var success = (pos) => {
            var crd = pos.coords;
            this.setState({
                latitude: crd.latitude,
                longitude: crd.longitude
            });
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }
        
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    componentDidUpdate (prevProps, prevState) {
        if(this.props.searchLocationQuery !== prevProps.searchLocationQuery) {
            this.setState({
                results: [], 
            }, () => this.getRestaurantsFromApi(this.props.searchLocationQuery))
            console.log(this.state)
        }
    }
    //function to get information from API 
    getRestaurantsFromApi = (locationSearched) => {
       
        //UI feedback to tell the user when we are retrieving infromation from the API 
        this.setState({ loading: true })

        //using a proxy server cors-anywhere to get rid of the CROS probblem 
        //SUPER HOT TIP: passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${locationSearched}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&limit=1`, {
        //required authorization format from API 
        headers: {
            //to get the API from the .env file use process.env.{variable name}
            Authorization: `Bearer ${process.env.REACT_APP_YELP_APP_API_KEY}`
        },
        //option params passed to API call to retrieve only breakfast and lunch spots 
        
        })
        .then((res) => {
            console.log(res.data.businesses)
            //change the state of App to reflect on the result we are given from the API
            //at the same time, setting the loading state to false 
            this.setState({ results: res.data.businesses, loading: false })
        })
        .catch((err) => {
            //fire the errorState message if there is no information return from the API
            console.log(err)
            this.setState({ errorState: `Sorry we coudln't find information related to the location you searched, do you want to try something else?`, loading: false })
        })
    }

    renderEmptyState () {
        return (
            <h2 className = "heading-tertiary">Hang tight! We are working on getting you the list of best brunch spots in your neighbourhood! </h2>
        )
    }

    renderRestaurantInfo () {

        const RestaruantList = this.state.results.map((result) => {
            
            return (  
                <div 
                    className = "RestaurantInfo"
                    key = {result.id}
                >
                    <img src = {result.image_url} alt = "" className = "RestaurantInfo__img" height="100" width="100"/>
                    <h2 className = "heading-tertiary RestaurantInfo__name">{result.name}</h2>
                    
                    <p className = "RestaurantInfo__para">
                        <FontAwesomeIcon 
                        icon = "map-marker-alt" 
                        className = "RestaurantInfo__icon"
                        aria-label = "address:" />
                        {result.location.display_address[0]}, {result.location.display_address[1]}
                    </p>
                    
                    <p className = "RestaurantInfo__para">
                        <FontAwesomeIcon 
                        icon = "phone" 
                        className = "RestaurantInfo__icon"
                        aria-label = "phone number:" />
                        {result.phone}
                    </p>

                    <img 
                        src = {require(`../../assets/yelp_stars/regular/${result.rating}.png`)}
                        alt = {`yelp ratings: ${result.rating}/5`}
                        className = "RestaurantInfo__rating"/>

                    <p className = "RestaurantInfo__reviewCount"> Based on {result.review_count} Reviews</p>
               
                    <a 
                        href= {result.url} 
                        className = "RestaurantInfo__website">
                            More information on Yelp
                    </a>

                </div>  
            );
        });

        return(
            <div className="RestuarantList__gallery">{RestaruantList}</div>
        )
    }

    render() {
        return (
            
            <section className="RestuarantList">
                {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}

                {/*conditional rendering for error state - when this.state.errorState is not true*/}
                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}

} 

export default MunchieSearch