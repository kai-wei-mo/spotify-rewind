/**
 * If the client is unauthenticated, redirect them to the login page.
 * This also accounts for legitimate users who have simply expired their
 * session.
 */

if (!sessionStorage.getItem('access_token')) {
	window.location.assign('/');
}
