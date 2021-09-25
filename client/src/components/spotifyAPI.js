import axios from "axios";
import { getHashParams} from "./functions";
import SpotifyWebApi from "spotify-web-api-js";

const EXPIRATION_TIME = 3600000; // 1 hour
const SERVER = "https://react-express-spotify.herokuapp.com/"; // or https://react-express-spotify.herokuapp.com/ http://localhost:8888
//REFRESH ACCESS TOKEN EVERY 1 HOUR
// REFRESH_URI

// USES JMPerez's spotify-web-api-js

export const spotifyApi = new SpotifyWebApi();

// constantly refreshing
export const refreshAccessToken = async () => {
  // take refresh token from local storage
  const refresh_token = window.localStorage.getItem("refresh_token");
  axios
    .get(SERVER + "refresh_token", {
      params: {
        refresh_token: refresh_token,
      },
    })
    .then((res) => {
      const access_token = res.data.access_token;
      console.log("New acccess_token", access_token);
      window.localStorage.setItem("access_token", access_token);
      window.localStorage.setItem("token_timestamp", Date.now());
      window.location.reload();
    })
    .catch((e) => console.log(e));
};

// GET TOKEN, REFRESH IF REQUIRED
export const getAccessToken = () => {
  // Takes token from our url

  const { error, access_token, refresh_token } = getHashParams();

  //  token invalid freom timeout
  if (error) {
    console.log(error);
    refreshAccessToken();
  }

  if (access_token && refresh_token) {
    window.location.replace("/");
    window.localStorage.setItem("access_token", access_token);
    window.localStorage.setItem("refresh_token", refresh_token);
    window.localStorage.setItem("token_timestamp", Date.now());

    return access_token;
  }
  // THIS WILL AUTO REFRESH OUR TOKEN BASED ON EXPIRY TIME
  const tokenExpiry = window.localStorage.getItem("token_timestamp");

  if (
    tokenExpiry &&
    tokenExpiry !== "undefined" &&
    Date.now() - tokenExpiry > EXPIRATION_TIME
  ) {
    console.log("Token expired, refreshing token");
    refreshAccessToken();
  }

  const local_access_token = window.localStorage.getItem("access_token");

  return local_access_token;
};

// SET OUR TOKEN with our spotify-web-api-js
export const token = getAccessToken();

spotifyApi.setAccessToken(token);
