import Link from 'next/link'
import Nav from '../components/nav'
import request from 'superagent';
import React, {Component} from 'react';


export default class Login extends Component {

    state = { 
        username: '', 
        password: '', 
        status: '', 
        token: ''
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
            password: this.state.password, 
        };

        const loginRequest = await fetch("http://localhost:5000/login", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`
            })
        })
        const jsonLoginData = await loginRequest.json()
        console.log(jsonLoginData)
        sessionStorage.setItem('jwt', jsonLoginData.token);

        const res2 = await fetch("http://localhost:5000/user/username/" + jsonLoginData.username, 
		  {headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${  sessionStorage.getItem('jwt')}`,
          },});
          const data2 = await res2.json()
          sessionStorage.setItem('id', data2.user.user_id);



          
        
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
                        Password
                        <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </div>


                <Link href={"/map" }>
				  {/* <a>{this.state.restaurants[id]}</a> */}
                  <input type="submit" value="Submit" />
			  </Link>
            {/* <input type="submit" value="Submit" /> */}
            </form>
            {this.state.status}
        </div>
      );
    }
  }

