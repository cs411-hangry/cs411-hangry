import Link from "next/link";
import Nav from "../components/nav";

// AIzaSyCjAYqAYLMEADjHTaoRfCm2AvuRfkMgdhU
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

const locations = [{ lat: -35.397, lng: 150.644 }, { lat: -34.397, lng: 150.644 }]

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
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown &&  locations.map( l => 
        <Marker position={l} />
    )}
	</GoogleMap>
));


// export default class Map extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<Nav />
//         	<MyMapComponent isMarkerShown />
// 			<button onClick= {this.restaurants.bind(this)}>
//           Get Restaurants
//         </button>

//         {this.state.ids.map( id => 
//         	<div> 
//             	<Link key={id} href={"/restaurant?id=" + id}>
//                 	<a>{this.state.restaurants[id]}</a>
//             	</Link>
//          	</div>
//         )}
		

// 			</div>
// 		);
// 	}
// }


export default class Map extends Component {


	constructor(props) {
		super(props);
		this.state = {
			restaurants: {}, 
			ids: [], 
			cuisines: [],
			cuisineIds: {},
			locations: [],
		};
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
	  const res2 = await fetch("http://localhost:5000/locations/city/Champaign", 
		{headers: {
		  'content-type': 'application/json',
		  Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
		},});
	  const data2 = await res2.json()
	//   [{ lat: -35.397, lng: 150.644 }, { lat: -34.397, lng: 150.644 }]
	  const locations = data2.locations.map(location => JSON.parse(JSON.stringify({ "lat": location.latitude, "lng": location.longitude })) )
	//   const longitude = data2.locations.map(location => location.longitude)
	  console.log(locations)
	//   my_locations = locations
	  this.setState({
		locations
	});
	//   console.log(longitude)
	//   const restaurants = data.restaurants.reduce( (p,c) => (p[c.restaurant_id] = c.restaurant_name) && p, {})
	//   const ids = data.restaurants.map(restaurant => restaurant.restaurant_id)
	//   this.setState({
	// 	  restaurants,
	// 	  ids
	//   });

	//   const locations = data.restaurants.map(restaurant => restaurant)
	//   console.log(locations)
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
		  <MyMapComponent isMarkerShown />
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
  