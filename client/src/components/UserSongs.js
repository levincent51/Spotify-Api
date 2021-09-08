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

const getAllSongs = async (res) => {
    const c = await getTrackfromPlaylist(res,[],100,0).then( (response) => {
        if (response) { 
            return response.map(x => x.track.id) 
        }
    })

    return c
}

export default async function fetchData() {
    return await getplaylists([],50,0).then(
        async (response) => {
            var all_songs = []
            for (const index of response.map(x => x.id)) {
                all_songs = [...all_songs, ...await getAllSongs(index)]
            }
            // instead of set state maybe import this from home
            return all_songs
    })  
}



 