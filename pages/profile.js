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
            checkinIds: {},
            ratings:[],
            paths:[],
            locations: [{ lat: 40.1298, lng:-88.2582 }],
            filter: "all", 
            category: "none"
		};
        this.locations()
        this.checkins()
		
      }
      
      async deleteCheckin(id) {
        fetch("http://localhost:5000/checkin/id/" + id, {
            method: 'DELETE', // or 'PUT'
            headers: new Headers({
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.checkins() );
        
        }

	async locations() {
		const res = await fetch("http://localhost:5000/checkin/location/" + "1");
        const data = await res.json()
        const test = data.locations.filter(l =>  new Date(l.timestamp).getHours() === this.state.filter ||this.state.filter === "all" )
        const locations = test.map( l => JSON.parse(JSON.stringify({ "lat": l.latitude, "lng": l.longitude })))
        this.setState({ locations });
	}
	  
	async checkins() {
        const res = await fetch("http://localhost:5000/checkin/id/" + "1");
        const data = await res.json()
        const checkins = data.checkins.map(c => c.timestamp)
        const checkinIds = data.checkins.reduce( (p,c) => (p[c.timestamp] = c.checkin_id) && p, {})     
        this.setState({
            checkins,
            ratings:[],
            checkinIds,
            category: "checkins"
        }); 
    };
    
    async setFilter(f) {
        this.setState({
            filter: f
        });
        this.locations()
    }
  
    async photos() {
        const res = await fetch("http://localhost:5000/photos/user/" + "1");
        const data = await res.json()
        const paths = data.photos.map(p => p.photo_path)
        console.log(paths)
        this.setState({
            paths, 
            category: "photos"
        });
    };

    
    async ratings() {
        const res = await fetch("http://localhost:5000/ratings/user/" + "1");
        const data = await res.json()

        const ratings = data.ratings.map(r => r.rating + " " + r.restaurant_name + " " + r.timestamp) 
        console.log(ratings)
        // console.log(paths)
        this.setState({
            ratings, 
            category: "ratings"
        });
    };

    



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
          <button onClick= {this.setFilter.bind(this,"all")}>all</button>    

            <p> </p> 
          <button onClick= {this.checkins.bind(this)}>
			My Checkins
		  </button>
          <button onClick= {this.photos.bind(this)}>
			My Photos
		  </button>
          <button onClick= {this.ratings.bind(this)}>
			My Ratings
		  </button>
          <p> </p>
          {this.state.category==="checkins" &&  this.state.checkins.map( (ts, i) => 
            <div>
                {ts}
                <button onClick={() => this.deleteCheckin(this.state.checkinIds[ts])}> x </button>
            </div>
          )}
        
           {this.state.category==="photos" && this.state.paths.map( (path, i) => <img src={path} height="300" width="300" />)}
          
          {this.state.category==="ratings" && this.state.ratings.map( rating => <p> {rating}</p> )}
          

		</div>
	  );
	}
  }
  