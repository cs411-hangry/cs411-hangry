import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A search was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
            <label>
                Search {this.props.searchItem}:
                <input type="text" name="Name" onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Search"/>
        </form>
        </div>
    )
  }
}

export default SearchBar
