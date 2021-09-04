import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

import { token } from "./components/spotifyAPI";

function App() {
  return (
    <div className="App">{token ? <Dashboard token={token} /> : <Login />}</div>
  );
}

export default App;
