function spotifyRequest(type, time_range, limit, offset) {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  var mainSource = document.getElementById('main-template').innerHTML,
      mainTemplate = Handlebars.compile(mainSource),
      mainPlaceholder = document.getElementById('main');

  var params = getHashParams();

  var error = params.error;
  let access_token = sessionStorage.getItem("access_token");
  let refresh_token = sessionStorage.getItem("refresh_token");

  if (error) {
    alert('There was an error during the authentication.');
  } else {
    if (access_token) {

      $.ajax({
          url: `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`,
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function(response) {

            /**
             * Add a ranking property to each item in items[], starting from 1.
             * Stringify each item's top 3 genres like so:
             * "art pop, dance pop, electropop"; capitalization is done client-side.
             * TODO: Differentiate song and artist pre-processing.
             */
            response.items.forEach((item, i) => {
              if (i + 1 <= 9) {
                item.ranking = i + 1;
                item.ranking += '⠀';
              } else {
                item.ranking = i + 1;
              }

              if (type === 'artists') {
                item.genres = item.genres.slice(0, 3).join(', ');
              }
            });

            mainPlaceholder.innerHTML = mainTemplate(response);
          },
          error: function() {
            window.location.href = '/';
          }
      });
    } else {
        // render initial screen
        //$('#login').show();
        //$('#loggedin').hide();
    }
  }
};
