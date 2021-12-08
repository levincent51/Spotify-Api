import React, { useState, useEffect } from "react";
import { spotifyApi, getAccessToken } from "../components/spotifyAPI";
import TrackInfo from "../components/TrackInfo";
import { CircularProgress } from "@material-ui/core";

const TopTracks = () => {
  const [toggleState, setToggleState] = useState(1);

  const [tracks, setTracks] = useState();
  const [timeRange, setTimeRange] = useState("short_term");

  const changeTerm = (newTimeRange) => {
    if (newTimeRange != timeRange) {
      setTracks();
    }
    setTimeRange(newTimeRange);
  };
  const toggleTab = (index, time_range) => {
    changeTerm(time_range);
    setToggleState(index);
  };
  useEffect(() => {
    spotifyApi
      .getMyTopTracks({
        limit: 50,
        time_range: timeRange,
      })
      .then((response) => {
        if (response) {
          console.log(response);
          setTracks({
            items: response.items,
          });
        }
      })
      .catch(() => {
        getAccessToken();
      });
  }, [timeRange]);

  return (
    <div>
      <h2>Top Tracks</h2>

      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1, "short_term")}
          >
            4 weeks
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2, "medium_term")}
          >
            6 months
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3, "long_term")}
          >
            All time
          </button>
        </div>
        {tracks ? (
          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              {tracks.items.map((track, key) => (
                <TrackInfo
                  key={key}
                  track={track}
                  index={tracks.items.indexOf(track)}
                />
              ))}
            </div>
            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              {tracks.items.map((track, key) => (
                <TrackInfo
                  key={key}
                  track={track}
                  index={tracks.items.indexOf(track)}
                />
              ))}
            </div>
            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              {tracks.items.map((track, key) => (
                <TrackInfo
                  key={key}
                  track={track}
                  index={tracks.items.indexOf(track)}
                />
              ))}
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default TopTracks;
