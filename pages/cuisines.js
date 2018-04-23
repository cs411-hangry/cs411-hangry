import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component, Button} from 'react';

export default class Cusines extends Component {

  state = {
    cuisines: [],
    cuisineIds: {},
    oldCuisineName: '',
    newCuisineName: ''
  };
    
  async users() {
    const res = await fetch("http://localhost:5000/cuisines", 
      {headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
      },});
    const data = await res.json()
    const cuisines = data.cuisines.map(cuisine => cuisine.cuisine_name)
    const cuisineIds = data.cuisines.reduce( (p,c) => (p[c.cuisine_name] = c.cuisine_id) && p, {})

    this.setState({
      cuisines,
      cuisineIds
    });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value,});
  }

  handleSubmit = (event) => {
    var data = {
      cuisine_name: this.state.newCuisineName, 
      cuisine_id: this.state.cuisineIds[this.state.oldCuisineName], 
    };
    console.log(JSON.stringify(data));
    
    fetch("http://localhost:5000/cuisine", {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
            })
        }).then(res => res.json())
        .catch(error => this.setState({status:"error"}))
        .then(response =>  this.setState({status:"success" + JSON.stringify(response)})  );
  }

  componentDidMount() {
    this.users()
  }

  render() {
    return (
      <div>
        <Nav />
        <form onSubmit={this.handleSubmit}>
          <div> 
              <label>
                  Old Cuisine Name
                  <input type="text" name="oldCuisineName" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label>
                  New Cuisine Name
                  <input type="text" name="newCuisineName" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Update Cuisine Name"/>
          </div>
        </form>
        {this.state.cuisines.map( food => 
        <div> 
            <Link key={food} href={"/cuisine?id=" + this.state.cuisineIds[food]}>
                <a>{food}</a>
            </Link>
         </div>
        )}
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
