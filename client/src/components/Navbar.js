import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">HOME</Link>
      <ul>
        <li>
          <Link to="/TopTracks">Top Tracks</Link>
        </li>
        <li>
          <Link to="/RecentTracks">RecentlyPlayed</Link>
        </li>
      </ul>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Navbar;
