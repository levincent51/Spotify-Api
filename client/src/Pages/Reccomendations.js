import TrackInfo from "../components/TrackInfo";
import React, { useState, useEffect } from "react";
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";
import fetchData from "../components/UserSongs";
// CHOOSE YOUR MOODS: SAD, GYM, GROOVY(DANCE), HAPPY, STUDY, chill glad
// GET AUDIOFEATURES OF SEVERAL TRACKS
// GET ALL TRACKS FROM PLAYLIST, THEN ALL TRACJKS FROM SAVED

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
Tempo: The overall estimated tempo of a track in beats per minute (BPM). (±50~200)*/

// LOGIC WORKSSS RECURSION
const getplaylists = async (playlists, limit, offset) => {
  const newOffset = offset + limit;
  var newPlaylist;
  await spotifyApi
    .getUserPlaylists({
      limit: limit,
      offset: offset,
    })
    .then((response) => {
      if (response) {
        newPlaylist = [...playlists, ...response.items];
        if (response.next) {
          newPlaylist = getplaylists(newPlaylist, limit, newOffset);
        }
      }
    })
    .catch(() => {
      getAccessToken();
    });
  return newPlaylist;
};

const getTrackfromPlaylist = async (playlistId, tracks, limit, offset) => {
  const newOffset = offset + limit;
  var newTrack;
  await spotifyApi
    .getPlaylistTracks(token, playlistId, { limit: limit, offset: offset })
    .then((response) => {
      if (response) {
        newTrack = [...tracks, ...response.items];
        if (response.next) {
          newTrack = getTrackfromPlaylist(
            playlistId,
            newTrack,
            limit,
            newOffset
          );
        }
      }
    });

  return newTrack; // AFTER THIS ARRAY.JOIN THEM ALL TO GET ALL THE track IDS WE NEED
};

const getAllSongs = (res) => {
  const c = getTrackfromPlaylist(res, [], 100, 0).then((response) => {
    if (response) {
      return response.map((x) => x.track.id);
      //response.map(x => x.track.id)
    }
  });

  return c;
};

function arraySplice(array, size) {
  var a = array;
  var spliced = [];
  if (array) {
    while (a.length) {
      spliced = [...spliced, a.splice(0, size)];
    }
  }
  return spliced;
}

const Reccommendations = () => {
  const [audioFet, setAudioFet] = useState();
  const [allSongs, setAllSongs] = useState();
  const [toggleState, setToggleState] = useState(1);
  const [mood, setMood] = useState("sad");
  const [songs, setSongs] = useState();

  const [tracks, setTracks] = useState();

  var audio_feat = JSON.parse(window.sessionStorage.getItem("audio_features"));
  var trackstorage = JSON.parse(window.sessionStorage.getItem("tracks"));

  // get every songs form every playlist and every saved

  const toggleTab = (index, mood) => {
    console.log(audioFet);
    setTracks();
    setMood(mood);
    setToggleState(index);
  };

  useEffect(() => {
    if (!trackstorage) {
      async function fetchData() {
        var all_songs = [];
        await getplaylists([], 50, 0).then(async (response) => {
          console.log("Fetching all songs...");

          for await (const index of response.map((x) => x.id)) {
            all_songs = [...all_songs, ...(await getAllSongs(index))];
          }

          // instead of set state maybe import this from home
          setAllSongs(all_songs);
          window.sessionStorage.setItem("tracks", JSON.stringify(all_songs));
        });
      }
      fetchData();
    } else {
      console.log("Fetching all songs...");
      setAllSongs(trackstorage);
    }
  }, []);
  //console.log(allSongs)

  useEffect(() => {
    //console.log(allSongs)
    if (!audio_feat) {
      if (allSongs) {
        var all_audio = [];

        const allSongsSpliced = arraySplice(allSongs, 100);

        async function get(all_audio) {
          for (const index of allSongsSpliced) {
            const c = await spotifyApi.getAudioFeaturesForTracks(index);
            all_audio = [...all_audio, ...c.audio_features];
          }
          setAudioFet(all_audio);
          window.sessionStorage.setItem(
            "audio_features",
            JSON.stringify(all_audio)
          );
        }
        console.log("Fetching audio data...");
        get(all_audio);
      }
    } else {
      console.log("Fetching audio data...");
      setAudioFet(audio_feat);
    }
  }, [allSongs]);

  useEffect(() => {
    if (allSongs) {
      setSongs(1);
    }
  }, [allSongs]);

  useEffect(() => {
    if (audioFet) {
      // TODO ADJUST THE FILTERS

      const audioFetFix = audioFet.filter((x) => x); // some songs have no audio features
      console.log(audioFetFix);
      if (mood == "sad") {
        console.log(":(");
        const FilteredSplice = arraySplice(
          audioFetFix.filter((x) => x.valence < 0.2),
          50
        );
        spotifyApi
          .getTracks(FilteredSplice[0].map((x) => x.id))
          .then((response) => {
            setTracks(response);
          });

        // SET TRACKS IN THIS LOGIC
      } else if (mood == "happy") {
        console.log(":)");
        const FilteredSplice = arraySplice(
          audioFetFix.filter((x) => x.energy > 0.7),
          50
        );
        spotifyApi
          .getTracks(FilteredSplice[0].map((x) => x.id))
          .then((response) => {
            setTracks(response);
          });
      } else if (mood == "study") {
        console.log(":/");
        const FilteredSplice = arraySplice(
          audioFetFix.filter((x) => x.danceability < 0.2),
          50
        );
        spotifyApi
          .getTracks(FilteredSplice[0].map((x) => x.id))
          .then((response) => {
            setTracks(response);
          });
      }
    }
  }, [mood, audioFet]);
  console.log(tracks);

  // NOW FILTER EVERYTHING IN AUDIO FEATURES

  // get audio features of everything, then we find songs less than 30 valence and 50energy, and display top 20

  // AUDIO FEATURES HOOK

  // neeed recursion of this logic

  return (
    <>
      <h1>
        {" "}
        Gather all the songs from all your playlists and find which songs
        statistically follow these moods
      </h1>

      <div>
        {songs ? (
          <div className="container">
            <h2>Songs Discovered: {audioFet ? audioFet.length : <>0</>}</h2>
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1, "sad")}
              >
                Sad
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2, "happy")}
              >
                Happy
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3, "study")}
              >
                Study
              </button>
            </div>
          </div>
        ) : (
          <b>Fetching all Songs....</b>
        )}
      </div>

      {audioFet ? (
        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            {tracks ? (
              <>
                {tracks.tracks.map((track, key) => (
                  <TrackInfo key={key} track={track} />
                ))}
              </>
            ) : (
              <p>Loading Sad songs :(</p>
            )}
          </div>
          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            {tracks ? (
              <>
                {tracks.tracks.map((track, key) => (
                  <TrackInfo key={key} track={track} />
                ))}
              </>
            ) : (
              <p>Loading Happy Songs :D</p>
            )}
          </div>
          <div
            className={
              toggleState === 3 ? "content  active-content" : "content"
            }
          >
            {tracks ? (
              <>
                {tracks.tracks.map((track, key) => (
                  <TrackInfo key={key} track={track} />
                ))}
              </>
            ) : (
              <p>Loading Study Songs :/</p>
            )}
          </div>
        </div>
      ) : (
        <b>Fetching Audio Data...</b>
      )}
    </>
    /* {tracks.items.map((track, key) => (
                <TrackInfo key={key} track={track}*/
  );
};

export default Reccommendations;
