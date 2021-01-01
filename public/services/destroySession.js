function destroySession() {
	sessionStorage.removeItem('access_token');
	sessionStorage.removeItem('refresh_token');
}
