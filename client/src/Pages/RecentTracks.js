import React, { Component, useState, useEffect } from "react";
import { spotifyApi } from "../components/spotifyAPI";
import format from "date-fns/format";
import { millisToMinutesAndSeconds } from "../components/functions";

const TableItem = (item, index) => (
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
      });
  }, []);
  console.log(RecentlyPlayed);

  return (
    <div>
      {RecentlyPlayed ? (
        <div className="recently-played">
          <h2>Recently played tracks</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Duration</th>
                <th>Track</th>
                <th>Artist(s)</th>
                <th>Played at</th>
              </tr>
            </thead>
            <tbody>
              {RecentlyPlayed.items.map((item, index) =>
                TableItem(item, index)
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <b>LOADING</b>
      )}
    </div>
  );
};
export default RecentTracks;
