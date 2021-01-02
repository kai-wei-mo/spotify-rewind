function populatePlaylist() {
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
	let playlist_id = sessionStorage.getItem('playlist_id');

	if (error) {
		alert('There was an error during the authentication.');
	} else {
		if (access_token) {
			let selected_links = document.querySelectorAll('.track');
			let uri_arr = [];

			for (let i = 0; i < selected_links.length; i++) {
				uri_arr[i] = selected_links[i].href;
			}

			$.ajax({
				type: 'POST',
				url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
				headers: {
					Authorization: 'Bearer ' + access_token,
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					uris: uri_arr,
				}),
				success: function (response) {
					sessionStorage.removeItem('playlist_id');
				},
				error: function () {
					alert('An unexpected error has occured.');
				},
			});
		} else {
			alert('A change of state has occured.\nPlease log in again.');
			window.location.href = '/';
		}
	}
}
