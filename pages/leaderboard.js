import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';

export default class LeaderBoard extends Component {



  constructor(props) {
    super(props);
    this.state = {
        restaurants: [], 
        ids: [], 
    };
    this.hottest()
    
  }
    
  async hottest() {
    const res = await fetch("http://localhost:5000/leaderboard/hot/" + "1", 
      {headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
      },});
    const data = await res.json()
    console.log(data)
    const restaurants = data.restaurants.map(d => d.restaurant_name + " " + String(d.avg).substring(0,4) )

    this.setState({
        restaurants
    })
    (this.state.restaurants.map(name => console.log(name)))
  };

  render() {
    return (
      <div>
        <Nav />
        <h3> Hottest Restaurants </h3> 
        <h5> Based on your average rating and proximity to you </h5> 
        {this.state.restaurants.map( name => 
            <p> {name} </p>

        )}
      </div>
    );
  }
}