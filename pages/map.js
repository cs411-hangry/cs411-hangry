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

const MyMapComponent = compose(
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

export default class Map extends Component {
	render() {
		return (
			<div>
				<Nav />
        <MyMapComponent isMarkerShown />
				{/* <MyMapComponent isMarkerShown /> */}
			</div>
		);
	}
}