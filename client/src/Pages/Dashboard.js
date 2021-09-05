import React, {  useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LogoutButton } from "../components/functions";
import Navbar from "../components/Navbar";
import TopTracks from "./TopTracks";
import RecentTracks from "./RecentTracks";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi, token , getAccessToken} from "../components/spotifyAPI";


// Find the best songs to fit your mood from your playlists:
// sad songs: energy : less than 0.5 happy songs have more energy and dancibility VALENCE HIGH HAPPY LOW SAD
// study songs have high instrumentals low speechiness

export default function Dashboard() {
  /*const [isPlaying, setIsPlaying] = useState(false);
  // Note the spotify web player SDK is in beta so performance is janky
  
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
  }, [isPlaying]);*/

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
          <Route path="/">
            <h1>WELCOME TO SPOTIFY API</h1>
          </Route>
        </Switch>
        {/*isPlaying ? (
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
        )*/}
      </div>
    </BrowserRouter>
  );
}
// ****** NESTED ROUTING
