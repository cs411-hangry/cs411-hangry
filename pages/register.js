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
  
    handleSubmit = async (event) => {
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
        const data2 = await fetch("http://localhost:5000/signup", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
            })
        });
        const jsonOutput = await data2.json();
        // .catch(error => this.setState({status:"error"}))
        // .then(response =>  this.setState({status:"success" + JSON.stringify(response)})  );

        const res2 = await fetch("http://localhost:5000/user/username/" + jsonOutput.username, 
		  {headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
          },});
          const data3 = await res2.json()
          sessionStorage.setItem('id', data3.user.user_id);
          console.log(data3.user.user_id)

    }
  
    render() {
      return (
        <div>  
            {/* <Nav />     */}
            <nav>
			<ul>
				<li>
					<Link prefetch href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link prefetch href="/login">
						<a>Login</a>
					</Link>
				</li>

				<li>
					<Link prefetch href="/register">
						<a>Register</a>
					</Link>
				</li>
			</ul> 
			<style jsx>{`
			:global(body) {
			margin: 0;
			font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
			}
			li {
			display: flex;
			padding: 6px 8px;
			}
			ul li{
			display: inline;
			}
			a {
			color: #067df7;
			text-decoration: none;
			font-size: 13px;
			}
			`}</style>
			</nav>

	
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


            <Link href={"/map" }>
                  <input type="submit" value="Submit" />
			  </Link>

            </form>

            {this.state.status}
        </div>
      );
    }
  }

