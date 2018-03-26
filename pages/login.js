import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component} from 'react';


export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { email: '', password: ''};

      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
  
    handleSubmit = (event) => {
        event.preventDefault();

        var data = {
            username: this.state.email, 
            password: this.state.password, 
        };

        fetch("http://localhost:5000/login", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
  
    render() {
      return (
        <div>  
            <Nav />    
            <form onSubmit={this.handleSubmit}>


                <label>
                    Email
                    <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
                </label>

                <label>
                    Password
                    <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
                </label>



            <input type="submit" value="Submit" />
            </form>
        </div>
      );
    }
  }

