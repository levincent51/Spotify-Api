import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LogoutButton } from "../components/functions";
import Navbar from "../components/Navbar";
import TopTracks from "./TopTracks";
import Reccommendations from "./TopArtist";
import RecentTracks from "./RecentTracks";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";

// Find the best songs to fit your mood from your playlists:
// sad songs: energy : less than 0.5 happy songs have more energy and dancibility VALENCE HIGH HAPPY LOW SAD
// study songs have high instrumentals low speechiness

/*
Danceability: The degree of how suitable a track is for dancing based on tempo, rhythm stability, beat strength, and overall regularity. (0~1)
Energy: The perceptual measure of intensity based on dynamic range, perceived loudness, timbre, onset rate, and general entropy. (0~1)
Key: The estimated overall pitch class of the track and its type of scale from which its melodic content is derived.
Loudness: The quality of a sound that is the primary psychological correlate of amplitude in decibel. (-60~0)
Speechiness: The presence of spoken words in a track. (0~1)
Acousticness: The confidence measure whether the track is acoustic. (0~1)
Liveness: The presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. (0~1)
Valence: The musical positiveness conveyed by a track (e.g. happy, cheerful, euphoric). (0~1)
Tempo: The overall estimated tempo of a track in beats per minute (BPM). (±50~200)
*/

export default function Dashboard() {
  // TODO: This takes too many requests, remove for now
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
          <Route path="/Recommendations">
            <Reccommendations />
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
