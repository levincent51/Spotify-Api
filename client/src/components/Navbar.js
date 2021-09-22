import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <li
        style={{
          background: "green",
        }}
      >
        <NavLink
          to="/"
          activeStyle={{
            fontWeight: "bold",
            color: "white",
            background: "green",
          }}
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Moods"
          activeStyle={{
            fontWeight: "bold",
            color: "green",
            textDecoration: "underline",
          }}
        >
          Moods
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/TopTracks"
          activeStyle={{
            fontWeight: "bold",
            color: "green",
            textDecoration: "underline",
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
            textDecoration: "underline",
          }}
        >
          RecentlyPlayed
        </NavLink>
      </li>

      <li style={{ float: "right" }}>
        <NavLink to="/logout">Logout</NavLink>
      </li>
    </div>
  );
};

export default Navbar;
