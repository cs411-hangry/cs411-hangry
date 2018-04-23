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
    {props.isMarkerShown &&  props.locations.map( (l, i) => 
        <Marker key={i} position={l} />
    )}
	</GoogleMap>
));

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			checkins: [], 
			ratings:[],
			locations: [{ lat: 40.1298, lng:-88.2582 }],
		};
		this.locations()
		
	  }

	async locations() {
        console.log('hi')
		const res = await fetch("http://localhost:5000/checkin/id/" + "1");
        const data = await res.json()
        const locationIds = data.checkins.map( l => l.location_id)
        let locations = []
        await Promise.all(locationIds.map(async (locationId) => {
            console.log(locationId)
            const resp =  await fetch("http://localhost:5000/locations/id/" + locationId); 
            const data_parsed = await resp.json()
            locations.push(JSON.parse(JSON.stringify({ "lat": data_parsed.locations[0].latitude, "lng": data_parsed.locations[0].longitude })))
            }))
        this.setState({
            locations
        });
	}
	  
	async checkins() {
        const res = await fetch("http://localhost:5000/checkin/id/" + "1");
        const data = await res.json()
        console.log(data.checkins)
        const checkins = data.checkins.map(c => c.timestamp)
        // console.log(checkins)
        
	  this.setState({
		  checkins,
		  ratings:[],
	  });
	};
  


	render() {
	  return (
		<div>
		  <Nav />
		  <MyMapComponent isMarkerShown locations={this.state.locations}/>
          <button onClick= {this.checkins.bind(this)}>
			My Checkins
		  </button>
          {this.state.checkins.map( (ts, i) => <p key={i}> {ts} </p> )}

		</div>
	  );
	}
  }
  