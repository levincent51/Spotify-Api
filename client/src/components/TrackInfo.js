import React, { useState, useEffect } from "react";



// our track card for displaying artist, trackname and the picture
const TrackInfo = ({track}) => {

  return(
    <a className="TrackInfoLink" href={track.uri}>
  <div className="card">
  <img src={track.album.images[1].url} alt="Track" />
  <div className="containerCard">
    <h4><b>{track.artists.map((e) => e.name).join(", ")}</b></h4>
    <p>{track.name}</p>
  </div>
</div>
  </a>
)

}
  
export default TrackInfo;