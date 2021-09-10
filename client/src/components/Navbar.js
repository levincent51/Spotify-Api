import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar">
		<li>
			<NavLink to="/">HOME</NavLink>
		</li>
		<li>
			<NavLink
			to="/TopTracks"
			activeStyle={{
				fontWeight: "bold",
				color: "green",
			}}
			>
			Top Tracks
			</NavLink>
		</li>
		<li>
			<NavLink
			to="/RecentTracks"
			activeStyle={{
				fontWeight: "bold",
				color: "green",
			}}
			>
			RecentlyPlayed
			</NavLink>
		</li>
		<li>
			<NavLink
			to="/Moods"
			activeStyle={{
				fontWeight: "bold",
				color: "green",
			}}
			>
			Moods
			</NavLink>
		</li>
		<li style={{ float: "right" }}>
	
			<NavLink to="/logout">Logout</NavLink>
		</li>
		</div>
	);
};

export default Navbar;
