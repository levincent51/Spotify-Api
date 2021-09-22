import React, { Component, useState, useEffect } from "react";
import { spotifyApi, getAccessToken } from "../components/spotifyAPI";
import format from "date-fns/format";
import { millisToMinutesAndSeconds } from "../components/functions";
import { CircularProgress } from "@material-ui/core";

const TableItem = (item) => (
  <tr key={item.played_at}>
    <td>
      <a href={item.track.uri} className="row-link">
        {millisToMinutesAndSeconds(item.track.duration_ms)}
      </a>
    </td>

    <td>
      <a href={item.track.uri} tabIndex="-1" className="row-link">
        {item.track.name}
      </a>
    </td>
    <td>
      <a href={item.track.uri} tabIndex="-1" className="row-link">
        {item.track.artists.map((e) => e.name).join(", ")}
      </a>
    </td>
    <td>
      <a href={item.track.uri} tabIndex="-1" className="row-link">
        {format(Date.parse(item.played_at), "dd/MM/yyyy, hh:mma")}
      </a>
    </td>
  </tr>
);

const RecentTracks = () => {
  const [RecentlyPlayed, setRecentlyPlayed] = useState();

  // variable limit? with useeffect to load more maybe on scroll down, limit will change
  useEffect(() => {
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 50,
      })
      .then((response) => {
        if (response) {
          console.log(response);
          setRecentlyPlayed({
            items: response.items,
          });
        }
      })
      .catch(() => {
        getAccessToken();
      });
  }, []);
  console.log(RecentlyPlayed);

  return (
    <div>
      <h2>Recently played tracks</h2>
      {RecentlyPlayed ? (
        <div className="recently-played">
          <table className="table">
            <thead>
              <tr>
                <th>Duration</th>
                <th>Track</th>
                <th>Artist(s)</th>
                <th>Played at</th>
              </tr>
            </thead>
            <tbody>{RecentlyPlayed.items.map((item) => TableItem(item))}</tbody>
          </table>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
export default RecentTracks;
