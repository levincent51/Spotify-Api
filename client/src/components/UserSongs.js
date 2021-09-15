
import { spotifyApi, token, getAccessToken } from "../components/spotifyAPI";


export const getplaylists = async (playlists, limit, offset) => {
	const newOffset = offset + limit;
	var newPlaylist;
	await spotifyApi
	.getUserPlaylists({
		limit: limit,
		offset: offset,
		})
		.then((response) => {
		if (response) {
			console.log(response)
			newPlaylist = [...playlists, ...response.items];
			if (response.next) {
			newPlaylist = getplaylists(newPlaylist, limit, newOffset);
			}
		}
		})
		.catch(() => {
		getAccessToken();
	});
	return newPlaylist;
};

const getTrackfromPlaylist = async (playlistId, tracks, limit, offset) => {
	const newOffset = offset + limit;
	var newTrack;
	await spotifyApi
		.getPlaylistTracks(token, playlistId, { limit: limit, offset: offset })
		.then((response) => {
		if (response) {
			newTrack = [...tracks, ...response.items];
			if (response.next) {
			newTrack = getTrackfromPlaylist(
				playlistId,
				newTrack,
				limit,
				newOffset
			);
			}
		}
		});
	
	
	return newTrack; // AFTER THIS ARRAY.JOIN THEM ALL TO GET ALL THE track IDS WE NEED
};



export const getAllSongs = async (res) => {
	const c = await getTrackfromPlaylist(res, [], 100, 0).then((response) => {
		if (response) {

			const filter = response.filter((x) => x.track)

	
			return filter.map((x) => x.track.id);
		//response.map(x => x.track.id)
		}
	});

	return c;
};

export function arraySplice(array, size) {
	var a = array;
	var spliced = [];
	if (array) {
		while (a.length) {
		spliced = [...spliced, a.splice(0, size)];
		}
	}
	return spliced;
}





 