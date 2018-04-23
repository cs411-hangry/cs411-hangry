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
            filter: "NONE"
		};
        this.locations()
        this.checkins()
		
	  }

	async locations() {
        console.log('hi')
		const res = await fetch("http://localhost:5000/checkin/id/" + "1");
        const data = await res.json()
        // const timestamps = data.checkins.map( l => l.timestamp)
        // console.log( new Date(timestamps[0]).getHours())
        // console.log( new Date(timestamps[1]).getHours())


        const test = data.checkins.filter(l =>  new Date(l.timestamp).getHours() === this.state.filter ||this.state.filter === "NONE" )
        console.log(test)
       

        const locationIds = test.map( l => l.location_id)
       
        let locations = []
        await Promise.all(locationIds.map(async (locationId) => {
            // console.log(locationId)
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
    
    async setFilter(f) {
        this.setState({
            filter: f
        });
        this.locations()
    }
  


	render() {
	  return (
		<div>
		  <Nav />
		  <MyMapComponent isMarkerShown locations={this.state.locations}/>
          <button onClick= {this.setFilter.bind(this,0)}>12am</button>
          <button onClick= {this.setFilter.bind(this,1)}>1am</button>
          <button onClick= {this.setFilter.bind(this,2)}>2am</button>
          <button onClick= {this.setFilter.bind(this,3)}>3am</button>
          <button onClick= {this.setFilter.bind(this,4)}>4am</button>
          <button onClick= {this.setFilter.bind(this,5)}>5am</button>
          <button onClick= {this.setFilter.bind(this,6)}>6am</button>
          <button onClick= {this.setFilter.bind(this,7)}>7am</button>
          <button onClick= {this.setFilter.bind(this,8)}>8am</button>
          <button onClick= {this.setFilter.bind(this,9)}>9am</button>
          <button onClick= {this.setFilter.bind(this,10)}>10am</button>
          <button onClick= {this.setFilter.bind(this,11)}>11am</button>
          <button onClick= {this.setFilter.bind(this,12)}>12pm</button>
          <button onClick= {this.setFilter.bind(this,13)}>1pm</button>
          <button onClick= {this.setFilter.bind(this,14)}>2pm</button>
          <button onClick= {this.setFilter.bind(this,15)}>3pm</button>
          <button onClick= {this.setFilter.bind(this,16)}>4pm</button>
          <button onClick= {this.setFilter.bind(this,17)}>5pm</button>
          <button onClick= {this.setFilter.bind(this,18)}>6pm</button>
          <button onClick= {this.setFilter.bind(this,19)}>7pm</button>
          <button onClick= {this.setFilter.bind(this,20)}>8pm</button>
          <button onClick= {this.setFilter.bind(this,21)}>9pm</button>
          <button onClick= {this.setFilter.bind(this,22)}>10pm</button>
          <button onClick= {this.setFilter.bind(this,23)}>11pm</button>
          <button onClick= {this.setFilter.bind(this,"NONE")}>all</button>


    

          <button onClick= {this.checkins.bind(this)}>
			My Checkins
		  </button>
          {this.state.checkins.map( (ts, i) => <p key={i}> {ts} </p> )}

		</div>
	  );
	}
  }
  