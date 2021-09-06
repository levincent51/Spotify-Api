import React, { useState, useEffect } from "react";
import { spotifyApi } from "../components/spotifyAPI";

const Reccommendations = () => {

    const [playlists, setPlaylists] = useState();
    const [allSongs, setAllSongs] = useState()
    spotifyApi.getUserPlaylists( {
        limit: 1,
    }).then((response) => {
        if (response) {
            console.log(response)
        }
        if (response.next) {
            spotifyApi.getUserPlaylists( {
                limit: 1,
                offset: 1
            }).then((response) => {
                if (response) {
                    console.log(response)
                }
            })
        }
    })

    // get every songs form every playlist and every saved 

    return (
        <div></div>
    )
}

export default Reccommendations