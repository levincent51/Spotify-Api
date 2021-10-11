import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LogoutButton } from "../components/functions";
import Navbar from "../components/Navbar";
import Home from "./Home";
import TopTracks from "./TopTracks";
import Moods from "./Moods";
import RecentTracks from "./RecentTracks";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";

export default function Dashboard() {
  // TODO: This takes too many requests, remove for now
  const [isPlaying, setIsPlaying] = useState(false);
// Note the spotify web player SDK is in beta so performance is janky

// 
  useEffect(() => {
    const interval = setInterval( async () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      if (response) {
      if (response.is_playing) {
        setIsPlaying(true);
      }
      } else if (!response) {
      setIsPlaying(false);
      }
    })
    .catch(() => {
      getAccessToken()
    });
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  //return should return, getTOPTRACKS, make playlist
  // DashBoard should tell us our favourite genre based on our top artist

  return (
    <BrowserRouter>
      <div /* will make a header bar FOR ALL OUR BROWSER ROUTES*/>
        <Navbar />

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
          <Route path="/Moods">
            <Moods />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        {isPlaying ? (
			<div className="player">
				<b>Currently Playing</b>
				<SpotifyPlayer
				token={token}
				syncExternalDevice={true}
				syncExternalDeviceInterval={5}
				/>
			</div>
			) : (
			<div className="player">
				<b>Currently Not Playing Anything </b>
			</div>
			)}
      </div>
    </BrowserRouter>
  );
}
// ****** NESTED ROUTING
