(function () {
	/**
	 * Obtains parameters from the hash of the URL
	 * @return Object
	 */
	function getHashParams() {
		let hashParams = {};
		let e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	let userProfileSource = document.getElementById('user-profile-template')
			.innerHTML,
		userProfileTemplate = Handlebars.compile(userProfileSource),
		userProfilePlaceholder = document.getElementById('user-profile');

	let params = getHashParams();

	let error = params.error;
	let access_token = sessionStorage.getItem('access_token');
	let refresh_token = sessionStorage.getItem('refresh_token');

	if (error) {
		alert('There was an error during the authentication.');
	} else {
		if (access_token) {
			$.ajax({
				url: 'https://api.spotify.com/v1/me',
				headers: {
					Authorization: 'Bearer ' + access_token,
				},
				success: function (response) {
					sessionStorage.setItem('user_id', response.id);
					userProfilePlaceholder.innerHTML = userProfileTemplate(response);
				},
				error: function () {
					window.location.href = '/';
				},
			});
		} else {
			alert('A change of state has occured.\nPlease log in again.');
			window.location.href = '/';
		}
	}
})();
