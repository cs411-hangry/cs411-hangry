import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component} from 'react';


export default class Login extends Component {

    state = { 
        username: '',
        email: '', 
        password: '',
        status: ''
    };
  
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
  
    handleSubmit = (event) => {
        event.preventDefault();

        var data = {
            username: this.state.username, 
            name: this.state.name,
            email: this.state.email, 
            password: this.state.password, 
            latitude: 0.0, 
            longitude: 0.0
        };

        console.log(data)
        fetch("http://localhost:5000/signup", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => this.setState({status:"error"}))
        .then(response =>  this.setState({status:"success" + JSON.stringify(response)})  );
    }
  
    render() {
      return (
        <div>  
            <Nav />    
            <form onSubmit={this.handleSubmit}>

                <div> 
                    <label>
                        Username
                        <input type="text" name="username" value={this.state.value} onChange={this.handleChange} />
                    </label>
                
                </div> 

                <div> 
                    <label>
                        Name
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </div> 
                
                <div> 
                    <label>
                        Email
                        <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </div> 

                <div> 
                    <label>
                        Password
                        <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </div> 

            <input type="submit" value="Submit" />
            </form>

            {this.state.status}
        </div>
      );
    }
  }

