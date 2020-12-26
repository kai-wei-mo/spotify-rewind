/*(function() {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */

   /*
  function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  let params = getHashParams();

  let access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;

  sessionStorage.setItem("access_token", access_token);
  sessionStorage.setItem("refresh_token", refresh_token);
})();

*/

function callbackReq() {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  let params = getHashParams();

  let access_token = params.access_token,
      refresh_token = params.refresh_token,
      error = params.error;

  sessionStorage.setItem("access_token", access_token);
  sessionStorage.setItem("refresh_token", refresh_token);
};
