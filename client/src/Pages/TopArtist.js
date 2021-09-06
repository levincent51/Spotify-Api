import React, { useState, useEffect } from "react";
import { spotifyApi, getAccessToken } from "../components/spotifyAPI";


// LOGIC WORKSSS RECURSION
const getplaylists = async (playlists, limit, offset) => {
    const newOffset = offset + limit
    console.log(playlists)
    const result =  await spotifyApi.getUserPlaylists({
        limit: limit,
        offset: offset,
    }).then((response) => {
        if (response) {
            console.log(response)
            const newPlaylist = [...playlists, ...response.items] ;
            console.log(newPlaylist)
            if (response.next) {
                getplaylists(newPlaylist, limit, newOffset)
            } 
        }
    }).catch(() => {
        getAccessToken()
    })
    return result
}


console.log(getplaylists([],10,0))


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