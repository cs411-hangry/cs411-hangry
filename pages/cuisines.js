import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';

export default class Cusines extends Component {

  state = {
    cuisines: [],
    cuisineIds: []
  };
    
  async users() {
    const res = await fetch("http://localhost:5000/cuisines") // Call the fetch function passing the url of the API as a parameter
    const data = await res.json()
    const cuisines = data.cuisines.map(cuisine => cuisine.cuisine_name)
    const cuisineIds = data.cuisines.reduce( (p,c) => (p[c.cuisine_name] = c.cuisine_id) && p, {})
    this.setState({
      cuisines,
      cuisineIds
    });
  
  };

  componentDidMount() {
    this.users()
  }

  render() {
    return (
      <div>
        <Nav />
        {/* <button onClick= {this.users.bind(this)}>
          Get Cuisines
        </button> */}

        {this.state.cuisines.map( food => 
        <div> 
            <Link key={food} href={"/cuisine?id=" + this.state.cuisineIds[food]}>
                <a>{food}</a>
            </Link>
         </div>

        )}
      </div>
    );
  }
}
