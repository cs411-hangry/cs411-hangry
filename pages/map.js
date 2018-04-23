import Link from "next/link";
import Nav from "../components/nav";
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

const MyMapComponent =  compose(
	withProps({
		googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjAYqAYLMEADjHTaoRfCm2AvuRfkMgdhU&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: "100%" }} />,
		containerElement: <div style={{ height: "400px" }} />,
		mapElement: <div style={{ height: "100%" }} />
	}),
	withScriptjs,
	withGoogleMap
)(props => (
	<GoogleMap defaultZoom={12} defaultCenter={props.locations[0]}>
    {props.isMarkerShown &&  props.locations.map( l => 
        <Marker position={l} />
    )}
	</GoogleMap>
));

export default class Map extends Component {

	constructor(props) {
		super(props);
		this.state = {
			restaurants: {}, 
			ids: [], 
			cuisines: [],
			cuisineIds: {},
			locations: [{ lat: 40.1298, lng:-88.2582 }],
		};
		this.locations()
		
	  }

	async locations() {
		const res = await fetch("http://localhost:5000/locations/city/Champaign", 
		{headers: {
		  'content-type': 'application/json',
		  Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
		},});
	  	const data = await res.json()
		const locations = data.locations.map(location => JSON.parse(JSON.stringify({ "lat": location.latitude, "lng": location.longitude })) )
		this.setState({
			locations
		});

	}
	  
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


	render() {
	  return (
		<div>
		  <Nav />
		  <MyMapComponent isMarkerShown locations={this.state.locations}/>
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

		  <button onClick= {this.cusines.bind(this)}>
			Get Cuisnes
		  </button>
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
  