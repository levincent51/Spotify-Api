import React from "react";
import "./Login.css";

const SERVER_URL = "https://react-express-spotify.herokuapp.com/login"; // https://react-express-spotify.herokuapp.com/login http://localhost:8888/login

export default function Login() {
  return (
    <div className="login">
      <p>An insight into your listening habits on Spotify</p>
      <a href={SERVER_URL}> Login to Spotify </a>
    </div>
  );
}
