import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';

export default class Restaurants extends Component {

  state = {
    restaurants: {}, 
    ids: [], 
  };
    
  async restaurants() {
    const res = await fetch("http://localhost:5000/restaurants", 
      {headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
      },});
    const data = await res.json()
    const restaurants = data.restaurants.reduce( (p,c) => (p[c.restaurant_id] = c.restaurant_name) && p, {})
    const ids = data.restaurants.map(restaurant => restaurant.restaurant_id)
    this.setState({
        restaurants,
        ids
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <button onClick= {this.restaurants.bind(this)}>
          Get Restaurants
        </button>

        {this.state.ids.map( id => 
        <div> 
            <Link key={id} href={"/restaurant?id=" + id}>
                <a>{this.state.restaurants[id]}</a>
            </Link>
         </div>

        )}
      </div>
    );
  }
}
