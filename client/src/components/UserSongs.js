import TrackInfo from "../components/TrackInfo";
import React, { useState, useEffect } from "react";
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";



const getplaylists = async (playlists, limit, offset) => {
    const newOffset = offset + limit
    var newPlaylist
    await spotifyApi.getUserPlaylists({
        limit: limit,
        offset: offset,
    }).then((response) => {
        if (response) {
            newPlaylist = [...playlists, ...response.items] ;
            /*if (response.next) {
                newPlaylist = getplaylists(newPlaylist, limit, newOffset)
            } */
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
            /*if (response.next) {
                newTrack = getTrackfromPlaylist(playlistId, newTrack, limit, newOffset)
            } */
        }
    })

    return newTrack // AFTER THIS ARRAY.JOIN THEM ALL TO GET ALL THE track IDS WE NEED
}

const getAllSongs = async () => {
     getplaylists([],4,0).then(
        (response) => {
            var all_songs = []

            response.map(x => x.id).forEach((res) => {
                getTrackfromPlaylist(res,[],4,0).then( (response) => {
                    if (response) {
                        all_songs = [...all_songs, ...response.map(x => x.track.id)] 
                        console.log(all_songs)
                    }
                
                })
            }) 
            console.log(all_songs)
        })  
}
export default function UserSongs () {

    const [addSong, setAddSong] = useState()

    useEffect(() => {
        setAddSong(getAllSongs)
        
    }, []);

    console.log(addSong)

    return addSong
}



