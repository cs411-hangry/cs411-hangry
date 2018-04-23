import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';

export default class LeaderBoard extends Component {



  constructor(props) {
    super(props);
    this.state = {
        restaurants: {}, 
        ids: [], 
    };
    this.hottest()
    
  }
    
  async hottest() {
    const res = await fetch("http://localhost:5000/leaderboard/hot/1", 
      {headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
      },});
    const data = await res.json()
    console.log(data)

  };

  render() {
    return (
      <div>
        <Nav />
        <h3> Hottest Restaurants </h3> 
        <h5> Based on your checkins </h5> 



        {this.state.ids.map( id => 
        <div> 
            <Link key={id} href={"/upload?id=" + id}>
                <a>{this.state.restaurants[id]}</a>
            </Link>
         </div>

        )}
      </div>
    );
  }
}