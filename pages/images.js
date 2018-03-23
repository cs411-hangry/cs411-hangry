import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';

export default class Images extends Component {

  state = {
    usernames: []
  };
    
  async users() {
    const res = await fetch("http://localhost:5000/users") // Call the fetch function passing the url of the API as a parameter
    const data = await res.json()
    const usernames = data.users.map(user => user.name)
    this.setState({
      usernames
    });
    console.log(this.state.usernames)
  };

  render() {
    return (
      <div>
        <Nav />
        <button onClick= {this.users.bind(this)}>
          Get Users
        </button>

        {this.state.usernames.map( u => <p> {u} </p>)}
      </div>
    );
  };
}
