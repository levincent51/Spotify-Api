import TrackInfo from "../components/TrackInfo";
import React, { useState, useEffect } from "react";
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";

// CHOOSE YOUR MOODS: SAD, GYM, GROOVY(DANCE), HAPPY, STUDY, chill glad
// GET AUDIOFEATURES OF SEVERAL TRACKS
// GET ALL TRACKS FROM PLAYLIST, THEN ALL TRACJKS FROM SAVED


// Find the best songs to fit your mood from your playlists:
// sad songs: energy : less than 0.5 happy songs have more energy and dancibility VALENCE HIGH HAPPY LOW SAD
// study songs have high instrumentals low speechiness

/*
Danceability: The degree of how suitable a track is for dancing based on tempo, rhythm stability, beat strength, and overall regularity. (0~1)
Energy: The perceptual measure of intensity based on dynamic range, perceived loudness, timbre, onset rate, and general entropy. (0~1)
Key: The estimated overall pitch class of the track and its type of scale from which its melodic content is derived.
Loudness: The quality of a sound that is the primary psychological correlate of amplitude in decibel. (-60~0)
Speechiness: The presence of spoken words in a track. (0~1)
Acousticness: The confidence measure whether the track is acoustic. (0~1)
Liveness: The presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. (0~1)
Valence: The musical positiveness conveyed by a track (e.g. happy, cheerful, euphoric). (0~1)
Tempo: The overall estimated tempo of a track in beats per minute (BPM). (±50~200)*/

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





const Reccommendations = () => {

    const [sad, setSad] = useState()

    const [recco, setRecco] = useState()

    const [playlists, setPlaylists] = useState([]);
    const [addSong, setAddSong] = useState()

    useEffect(() => {
        getplaylists([],2,0).then(
            (response) => {
                var all_songs = []
                response.map(x => x.id).forEach((res) => {
                    getTrackfromPlaylist(res,[],2,0).then( (response) => {
                        if (response) {
                            console.log(res,response)
                            all_songs = [...all_songs, ...response.map(x => x.track.id)] 
                            setAddSong(all_songs)
                        }
                       
                    })
                }) 
            })  
        
    }, []);


    /*
    useEffect(() => {
        var all_songs = []
        playlists.forEach((res) => {
            getTrackfromPlaylist(res,[],3,0).then( (response) => {
                if (response) {
                    all_songs = [...all_songs, ...response.map(x => x.track.id)] 
                    setAllSongs(all_songs)
                }
            })
        })

    }, [playlists]);*/

    /* var a = YOUR_ARRAY;
while(a.length) {
    console.log(a.splice(0,100));

}*/
    // get audio features of everything, then we find songs less than 30 valence and 50energy, and display top 20

    
    // AUDIO FEATURES HOOK
 
    


    // Get Audio Features for several tracks max id is 100
    // getting back our several tracks max id is 50

    //console.log(playlists.map( x => x.id))
 



    // neeed recursion of this logic

    const [toggleState, setToggleState] = useState(1);
    // get every songs form every playlist and every saved 
    
    const changeTerm = (newTimeRange) => {
    };

    const toggleTab = (index, time_range) => {
        changeTerm(time_range);
        setToggleState(index);
    };

    return (
        <div>{addSong ? (
            <div className="container">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1, "short_term")}
              >
                Sad
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2, "medium_term")}
              >
                Happy
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3, "long_term")}
              >
                Study
              </button>
            </div>
            </div>
        ) : (<b>loading</b>)}</div>
        /* {tracks.items.map((track, key) => (
                <TrackInfo key={key} track={track}*/
    )
}

export default Reccommendations