import Link from 'next/link';
import Nav from '../components/nav';
import SearchBar from '../components/searchBar'
import React, {Component} from 'react';
// import 
// import Dropzone from 'react-dropzone';
// import request from 'superagent';

export default class Search extends Component {
    render() {
        return (
            <div>
                <Nav />
                <SearchBar searchItem = 'Restaurant' />
            </div>
        );
    }
}