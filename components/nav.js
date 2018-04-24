import Link from "next/link";

function logout() {
	sessionStorage.removeItem("jwt");
}


const Nav = () => (
	<nav>
		<ul>
			<li>
				<Link prefetch href="/">
					<a>Home</a>
				</Link>
			</li>  
			<li>
				<Link prefetch href="/restaurants">
					<a>Check In</a>
				</Link>
			</li>

			<li>
				<Link prefetch href="/profile">
					<a>Profile</a>
				</Link>
			</li>
			<li>
				<Link prefetch href="/map">
					<a>Map</a>
				</Link>
			</li>
			<li>
				<Link prefetch href="/leaderboard">
					<a>Trending</a>
				</Link>
			</li>
			<li>
				<Link prefetch href="/cuisineleaderboard">
					<a>Cuisine Leaderboard</a>
				</Link>
			</li>
			<Link href={"/" }>
					<button onClick={logout}>Logout</button>
			  </Link>

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
);

export default Nav;
