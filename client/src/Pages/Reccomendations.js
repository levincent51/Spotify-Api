import React, { useState, useEffect } from "react";
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";


// CHOOSE YOUR MOODS: SAD, GYM, GROOVY(DANCE), HAPPY, STUDY, chill glad
// GET AUDIOFEATURES OF SEVERAL TRACKS
// GET ALL TRACKS FROM PLAYLIST, THEN ALL TRACJKS FROM SAVED


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

const getTrackfromPlaylist = async (playlistId, tracks, limit, offset) => {
    const newOffset = offset + limit
    var newTrack
    await spotifyApi.getPlaylistTracks(
        token,
        playlistId,
        {limit: limit,
        offset: offset,}).then((response) => {
        if (response) {
            newTrack = [...tracks, ...response.items] ;
            if (response.next) {
                newTrack = getTrackfromPlaylist(playlistId, newTrack, limit, newOffset)
            } 
        }
    })

    return newTrack // AFTER THIS ARRAY.JOIN THEM ALL TO GET ALL THE track IDS WE NEED
}

console.log(getTrackfromPlaylist("6mSPlgg3X9RguFcpnZZDIw", [], 100, 0))

console.log(spotifyApi.getMySavedTracks({
    limit:50,
}))



const Reccommendations = () => {

    const [playlists, setPlaylists] = useState([]);
    const [allSongs, setAllSongs] = useState()


    useEffect(() => {
        getplaylists([],50,0).then(
            (response) => {
                setPlaylists(response.map(x => x.id))
            }
        )
    }, []);

    console.log(playlists)
    //console.log(playlists.map( x => x.id))
 



    // neeed recursion of this logic


    // get every songs form every playlist and every saved 

    return (
        <div></div>
    )
}

export default Reccommendations