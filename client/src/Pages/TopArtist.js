import React, { useState, useEffect } from "react";
import { spotifyApi, getAccessToken } from "../components/spotifyAPI";


// LOGIC WORKSSS RECURSION
const getplaylists = async (playlists, limit, offset) => {
    const newOffset = offset + limit
    var newPlaylist
    await spotifyApi.getUserPlaylists({
        limit: limit,
        offset: offset,
    }).then((response) => {
        if (response) {
            newPlaylist = [...playlists, ...response.items] ;
            if (response.next) {
                newPlaylist = getplaylists(newPlaylist, limit, newOffset)
            } 
        }
    }).catch(() => {
        getAccessToken()
    })
    return newPlaylist
}

console.log(spotifyApi.getUserPlaylists({
    limit: 10,
    offset: 0,
}))

console.log(getplaylists([],7,0))


const Reccommendations = () => {

    const [playlists, setPlaylists] = useState();
    const [allSongs, setAllSongs] = useState()


    useEffect(() => {

    
    }, []);

    
    // neeed recursion of this logic


    // get every songs form every playlist and every saved 

    return (
        <div></div>
    )
}

export default Reccommendations