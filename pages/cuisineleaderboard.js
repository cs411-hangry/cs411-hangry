import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Buttonm, Input} from 'react';

export default class cuisineleaderboard extends Component {
  state = {
    restaurants: [], 
    value: '',
    map_state: "none",
    cuisines: [],
    cuisineIds: {},
    cuisine:'',
    day: ''
};

  constructor(props) {
    super(props);
    this.handleCusineChange = this.handleCusineChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
    

  async handleCusineChange(event) {
    
    await this.setState({cusine: event.target.value});
  }

  async handleDayChange(event) {
    
    await this.setState({day: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const cuisine = this.state.cusine
      var data = {
        cuisine_id: this.state.cuisineIds[cuisine], 
        num_days: this.state.day, 
      };
      const res = await fetch("http://localhost:5000/leaderboard/top/" + "1", {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
        })
    })
    const data2 = await res.json()
    const restaurants = data2.restaurants.map(d => d.restaurant_name + " " + String(d.avg).substring(0,4) )

    this.setState({
        restaurants, 
        map_state: "results"
    })
    console.log(restaurants)
  }

  async cusines() {

		const res = await fetch("http://localhost:5000/cuisines", 
		  {headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
		  },});
		const data = await res.json()
		const cuisines = data.cuisines.map(cuisine => cuisine.cuisine_name)
		const cuisineIds = data.cuisines.reduce( (p,c) => (p[c.cuisine_name] = c.cuisine_id) && p, {})
		console.log(cuisines)
		this.setState({
		  cuisines,
		  cuisineIds
    });
	  };

    componentDidMount() {
      this.cusines();
    }

  render() {
    return (
      <div>
        <Nav />
        <h3> Cusine Leaderboard </h3>

        {this.state.map_state !== "results" && 
            <div> 
              <h4> Pick a cuisine</h4> 
                  <div>
                    <select defaultValue={this.state.cuisine} onChange={this.handleCusineChange} >
                      {this.state.cuisines.map(x => <option value={x}>{x}</option>)}
                    </select>
                  </div>  

              <h4> Pick a day</h4> 
                  <div>
                    <select defaultValue={this.state.day} onChange={this.handleDayChange} >
                      {Array.from({length: 31}, (x,i) => i).map(x => <option value={x+1}>{x+1}</option>)}
                    </select>
                  </div> 

                  <button onClick= {this.handleSubmit.bind(this)}>
                Submit
              </button> 
            </div> 

        }
        {this.state.map_state === "results" && 
            <div> 
              {this.state.restaurants.map(r => <p> {r} </p>)}
            </div> 

        }
      </div>

      



    );
  }
}