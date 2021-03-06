import React, {Component} from 'react';

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            searchLocationQuery: ""
        }
    }

    handleSearchChange = (e) => {
        this.setState({
            searchLocationQuery: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('hit')
        this.props.onFormSubmit(this.state.searchLocationQuery)
    }

    render(){
        return (
            <div className = "searchForm">
                {/*add an event listener of form submit so the state only get set when the form is submitted*/}
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <label 
                    htmlFor = 'location'
                    arialabel = 'enter address, neighbourhood, city, province or postal code'
                    className = 'searchForm__label'
                    >Tell Us: </label>
                    <input 
                    type = 'text'
                    id = 'location'
                    placeholder = "Name of Establishment you're at"
                    value = {this.state.searchLocationQuery}
                    onChange = {this.handleSearchChange}
                    className = 'searchForm__input'
                    />
                    <button 
                    type = 'submit'
                    className = 'searchForm__button'
                    >Search
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchForm
