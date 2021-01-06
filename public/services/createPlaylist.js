// RETURNS A PLAYLIST ENDPOINT

function createPlaylist(
	playlist_name = 'New Playlist by Spotify Rewind',
	public = false,
	collaborative = false,
	description = ''
) {
	/**
	 * Obtains parameters from the hash of the URL
	 * @return Object
	 */
	function getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	var params = getHashParams();
	var error = params.error;
	let access_token = sessionStorage.getItem('access_token');
	let user_id = sessionStorage.getItem('user_id');

	if (error) {
		alert('There was an error during the authentication.');
	} else {
		if (access_token) {
			$.ajax({
				type: 'POST',
				url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
				headers: {
					Authorization: 'Bearer ' + access_token,
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					name: playlist_name,
					public: public,
					collaborative: collaborative,
					description: description,
				}),
				success: function (response) {
					sessionStorage.setItem('playlist_id', response.id);
				},
				error: function () {
					alert(
						'Playlist generation is not available at this time.\nPlease try again later.'
					);
				},
			});
		} else {
			alert('A change of state has occured.\nPlease log in again.');
			window.location.href = '/';
		}
	}
}
