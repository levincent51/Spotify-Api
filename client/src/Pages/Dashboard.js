import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { LogoutButton } from "../components/functions";
import TopTracks from "./TopTracks";
import RecentTracks from "./RecentTracks";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi } from "../components/spotifyAPI";

export default function Dashboard({ token }) {
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const interval = setInterval( () => {

    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if (response) {
        if (response.is_playing) {
          setIsPlaying(true);
        } else if(!response.is_playing) {
          // get current playing
          // MAYBE CHANGE IT SO THAT ISPLAYING DOESNT stop it completely
        }
      }
    })
  }, 2000)
    return () => clearInterval(interval)
  }, [isPlaying]);

  //return should return, getTOPTRACKS, make playlist
  // DashBoard should tell us our favourite genre based on our top artist
  return (
    <BrowserRouter>
      <div /* will make a header bar FOR ALL OUR BROWSER ROUTES*/>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/TopTracks">Top Tracks</Link>
          </li>
          <li>
            <Link to="/RecentTracks">RecentlyPlayed</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        

        <Switch>
          <Route path="/RecentTracks">
            <RecentTracks />
          </Route>
          <Route path="/logout">
            <LogoutButton />
          </Route>
          <Route path="/TopTracks">
            <TopTracks />
          </Route>
          <Route path="/">
            <h1>WELCOME TO SPOTIFY API</h1>
          </Route>
        </Switch>
      {isPlaying ? (
          <div className='player'>
          <b>Currently Playing</b>
          <SpotifyPlayer
            token={token}
            syncExternalDevice={true}
            syncExternalDeviceInterval={3}
          />
          </div>
        ) : (
          <div className='player'>
          <b>Not Playing Anything Currently</b>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
// ****** NESTED ROUTING
