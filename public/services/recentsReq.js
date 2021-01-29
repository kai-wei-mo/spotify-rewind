function recentsRequest(limit) {
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

	/**
	 * Check if datetime obj is between midnight and now.
	 * @return boolean
	 */
	const isToday = (someDate) => {
		let now = new Date();
		return (
			someDate.getDate() == now.getDate() &&
			someDate.getMonth() == now.getMonth() &&
			someDate.getFullYear() == now.getFullYear()
		);
	};

	/**
	 * Check if datetime obj is some time yesterday (before midnight).
	 * @return boolean
	 */
	const isYesterday = (someDate) => {
		let now = new Date();
		return (
			someDate.getDate() == now.getDate() - 1 &&
			someDate.getMonth() == now.getMonth() &&
			someDate.getFullYear() == now.getFullYear()
		);
	};

	/**
	 * @return boolean
	 */
	const isOverNDaysAgo = (someDate, n) => {
		let yearAgo = new Date();
		yearAgo.setDate(yearAgo.getDate() - n);

		return someDate < yearAgo;
	};

	/**
	 * Used for formatting times of day (HH:mm).
	 * @return string
	 */
	function format_two_digits(n) {
		return n < 10 ? '0' + n : n;
	}

	function formatDate(iso) {
		// ISO ex: 2020-12-25T02:59:51.675Z
		let date = new Date(iso);

		let day_map = {
			0: 'Sun',
			1: 'Mon',
			2: 'Tue',
			3: 'Wed',
			4: 'Thu',
			5: 'Fri',
			6: 'Sat',
		};

		let month_map = {
			0: 'Jan',
			1: 'Feb',
			2: 'Mar',
			3: 'Apr',
			4: 'May',
			5: 'Jun',
			6: 'Jul',
			7: 'Aug',
			8: 'Sep',
			9: 'Oct',
			10: 'Nov',
			11: 'Dec',
		};

		if (isToday(date)) {
			let ret = '';
			if (date.getHours() / 10 < 1) {
				ret += '0';
			}
			return (
				'' +
				ret +
				format_two_digits(date.getHours()) +
				':' +
				format_two_digits(date.getMinutes())
			);
		}

		if (isYesterday(date)) {
			return (
				'yesterday ' +
				format_two_digits(date.getHours()) +
				':' +
				format_two_digits(date.getMinutes())
			);
		}

		if (isOverNDaysAgo(date, 365)) {
			return 'over a year ago';
		}

		if (!isOverNDaysAgo(date, 6)) {
			return `${day_map[date.getDay()]} ${format_two_digits(
				date.getHours()
			)}:${format_two_digits(date.getMinutes())}`;
		}

		return `${format_two_digits(date.getDate())} ${
			month_map[date.getMonth()]
		} ${format_two_digits(date.getHours())}:${format_two_digits(
			date.getMinutes()
		)}`;
	}

	var recentsSource = document.getElementById('recents-template').innerHTML,
		recentsTemplate = Handlebars.compile(recentsSource),
		recentsPlaceholder = document.getElementById('recents');

	var params = getHashParams();

	var error = params.error;
	let access_token = sessionStorage.getItem('access_token');
	let refresh_token = sessionStorage.getItem('refresh_token');

	if (error) {
		alert('There was an error during the authentication.');
	} else {
		if (access_token) {
			$.ajax({
				url: `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,

				headers: {
					Authorization: 'Bearer ' + access_token,
				},
				success: function (response) {
					response.items.forEach((item, i) => {
						item.played_at = formatDate(item.played_at);
					});

					recentsPlaceholder.innerHTML = recentsTemplate(response);
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
}
