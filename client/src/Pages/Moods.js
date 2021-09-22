import TrackInfo from "../components/TrackInfo";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { spotifyApi, getAccessToken } from "../components/spotifyAPI";
import {
  arraySplice,
  getplaylists,
  getAllSongs,
} from "../components/UserSongs";
import {
  Slider,
  Typography,
  Switch,
  CircularProgress,
} from "@material-ui/core";

// TODO -> Option to disable some slider options, change cards into grids, then click/hover to get audio features.
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

const Moods = () => {
  const [audioFet, setAudioFet] = useState();
  const [allSongs, setAllSongs] = useState();
  const [search, setSearch] = useState(false);
  const totalSongs = useRef(0);

  const [songs, setSongs] = useState();
  const [tracks, setTracks] = useState();

  var audio_feat = JSON.parse(window.sessionStorage.getItem("audio_features"));
  var trackstorage = JSON.parse(window.sessionStorage.getItem("tracks"));

  const getTracksfromList = async (arraysplice) => {
    var Tracks = { tracks: [] };

    for (var i = 0; i < arraysplice.length; i++) {
      const c = await spotifyApi.getTracks(arraysplice[i].map((x) => x.id));
      Tracks.tracks = [...Tracks.tracks, ...c.tracks];
    }

    setTracks(Tracks);
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
          // filter duplicates
          const unique = [...new Set(all_songs)];
          setAllSongs(unique);
          window.sessionStorage.setItem("tracks", JSON.stringify(unique));
          totalSongs.current = unique.length;
        });
      }
      fetchData();
    } else {
      console.log("Fetching all songs...");
      setAllSongs(trackstorage);
      totalSongs.current = trackstorage.length;
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
          const audioWithFeat = all_audio.filter((x) => x); // filter out songs without features
          setAudioFet(audioWithFeat);
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

  const [value, setValue] = useState(0.5);
  const [value1, setValue1] = useState(0.5);
  const [value2, setValue2] = useState(0.5);
  const [vocal, setVocal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue / 100);
  };
  const handleChange1 = (event, newValue1) => {
    setValue1(newValue1 / 100);
  };
  const handleChange2 = (event, newValue2) => {
    setValue2(newValue2 / 100);
  };
  const handleVocal = () => {
    setVocal(!vocal);
  };

  const filterReq = useCallback(async () => {
    setTracks();
    setSearch(true);
    const filter = audioFet.filter(
      (x) =>
        x.valence >= value - 0.1 &&
        x.valence <= value + 0.1 &&
        x.energy >= value1 - 0.1 &&
        x.energy <= value1 + 0.1 &&
        x.danceability >= value2 - 0.1 &&
        x.danceability <= value2 + 0.1
    );
    var filter2;
    if (vocal) {
      filter2 = filter.filter((x) => x.instrumentalness <= 0.4);
    } else {
      filter2 = filter.filter((x) => x.instrumentalness >= 0.8);
    }
    const FilteredSplice = arraySplice(filter2, 50);
    console.log(FilteredSplice);
    getTracksfromList(FilteredSplice);
  });

  const marksValence = [
    {
      value: 0,
      label: "sad",
    },
    {
      value: 50,
      label: "neutral",
    },
    {
      value: 100,
      label: "happy",
    },
  ];

  const marksEnergy = [
    {
      value: 0,
      label: "chill",
    },
    {
      value: 50,
      label: "neutral",
    },
    {
      value: 100,
      label: "hype",
    },
  ];

  const marksDance = [
    {
      value: 0,
      label: "calm",
    },
    {
      value: 50,
      label: "neutral",
    },
    {
      value: 100,
      label: "dance!",
    },
  ];

  return (
    <>
      <h1>
        {" "}
        Gather all your songs and find the perfect songs to match your current
        mood
      </h1>
      <h2>Choose source (in development)</h2>
      <button> Get All Liked Songs</button>
      <button> Get All Playlists</button>
      <button> Get Only Your Playlists</button>
      <button> Get Everything</button>
      <div>
        {songs ? (
          <div className="container">
            <h2>Total Songs Discovered: {totalSongs.current}</h2>
            <div className="sliders">
              <div>
                <Typography>Mood</Typography>

                <Slider
                  value={value * 100}
                  onChange={handleChange}
                  aria-labelledby="discrete-slider-small-steps"
                  marks={marksValence}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </div>
              <div>
                <Typography>Energy</Typography>

                <Slider
                  value={value1 * 100}
                  onChange={handleChange1}
                  aria-labelledby="discrete-slider-small-steps"
                  marks={marksEnergy}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </div>
              <div>
                <Typography>Groove</Typography>

                <Slider
                  value={value2 * 100}
                  onChange={handleChange2}
                  aria-labelledby="discrete-slider-small-steps"
                  marks={marksDance}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </div>
              <div>
                <Typography>Vocals</Typography>
                <Switch onChange={handleVocal} label="Vocals" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <b>Fetching all Songs....</b>
            <CircularProgress />
            <p>
              Please do not refresh/leave the page while this is occuring.
            </p>{" "}
          </>
        )}
      </div>

      {audioFet ? (
        <div>
          <p>Songs Found: {tracks ? <>{tracks.tracks.length}</> : 0} </p>
          <div>
            <button onClick={filterReq}>Find Songs!</button>
          </div>

          {tracks ? (
            tracks.tracks.length ? (
              tracks.tracks.map((track, key) => (
                <TrackInfo
                  key={key}
                  track={track}
                  index={tracks.tracks.indexOf(track)}
                />
              ))
            ) : (
              <p>no songs </p>
            )
          ) : search ? (
            <CircularProgress />
          ) : (
            <p>Click the button to find your songs!</p>
          )}
        </div>
      ) : (
        <>
          {songs ? (
            <>
              <b>Fetching Audio Data...</b> <CircularProgress />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Moods;
