import React, { useState, useEffect } from "react";
import { spotifyApi, getAccessToken } from "../components/spotifyAPI";
import { CircularProgress } from "@material-ui/core";

const Home = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    spotifyApi
      .getMe()
      .then((response) => {
        setProfile(response);
      })
      .catch(() => {
        getAccessToken();
      });
  }, []);

  console.log(profile);

  return (
    <div>
      {profile ? (
        <>
          <h1>Welcome to Spoti-FYI.</h1>
          <h2>Hi {profile.display_name.split(" ")[0]} </h2>
          <img src={profile.images[0].url} />
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Home;
