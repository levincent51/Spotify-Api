const CLIENT_SERVER = "http://spoti-fyi.netlify.app/#"; // http://spoti-fyi.netlify.app/# http://localhost:3000/#
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
const cors = require("cors");

var client_id = "67e476d47ae849a397e99e88583bb1a1"; // Your client id
var client_secret = "6ed3f24ecbb74117b8bd5effa4e158d7"; // Your secret
var redirect_uri = "https://react-express-spotify.herokuapp.com/callback"; //https://react-express-spotify.herokuapp.com/callback Or Your redirect uri http://localhost:8888/callback

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

// uses our directory and public for serving our html with
app
  .use(express.static(__dirname + "/public"))
  .use(cookieParser())
  .use(cors({ origin: true }));

app.get("/login", (req, res) => {
  // random state
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = [
    "streaming",
    "user-read-private",
    "user-read-playback-state",
    // What we want from the user
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-read-email",
    "user-top-read", // top artist and track
    "user-modify-playback-state",
    "user-read-private",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "user-library-read",
  ];
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      "client_id=" +
      client_id +
      "&redirect_uri=" +
      redirect_uri +
      "&scope=" +
      scope.join("%20") +
      "&response_type=code&show_dialog=true" +
      "&state=" +
      state
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect("/#" + "error=" + "state_mismatch");
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          CLIENT_SERVER +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

// When the access code expires, send a POST request to the Accounts service /api/token endpoint,
//but use this code in place of an authorization code. A new access token will be returned. A new
// refresh token might be returned too.
app.get("/refresh_token", (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;

      // THIS IS THE CORRECT, REDIRECT VIOLATES CORS POLICIES
      res.send({
        access_token: access_token,
      });

      /*
		res.redirect(CLIENT_SERVER +
			querystring.stringify({
			access_token: access_token,
			refresh_token: refresh_token,
			}));*/
    } else {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token",
          })
      );
    }
  });
});

app.get("/", (req, res) => {
  res.redirect(CLIENT_SERVER);
});

console.log(process.env.PORT);
app.listen(8888);
