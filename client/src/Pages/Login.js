import React from "react";
import "./Login.css";

const SERVER_URL = "https://react-express-spotify.herokuapp.com/login";

export default function Login() {
  return (
    <div className="login">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
        alt="Spotify-Logo"
      />
      <p>
        {" "}
        A Spotify API designed to find your favourite songs over the past year
        😀{" "}
      </p>
      <a href={SERVER_URL}> Login to Spotify </a>
    </div>
  );
}
