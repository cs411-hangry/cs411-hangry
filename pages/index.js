import Link from "next/link";
import Nav from "../components/nav";
import request from "superagent";

function logout() {
	sessionStorage.removeItem("jwt");
	sessionStorage.removeItem("id");
	console.log("logged out")
}

var divStyle = {
	float: "right"
  };

export default () => (
	<div>
	
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

	</div>
);


