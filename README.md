# spotify-rewind

This application uses the Spotify Web API to identify a user's top tracks and top artists, determined by the user's streaming behavior.

Users can also create playlists with their top tracks and save them for future listening.

Check it out at spotifyrewind.co!

<!---
screenshot of website page(s)
-->

## Creating a Spotify App

1. Create an App in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

2. In your app's settings, add `http://localhost:8888/callback/` as a **Redirect URI**.

3. Save the App's **Client ID** and **Client Secret**.

## Development

- `npm install`
- `cd src`
- `cp update_me.env .env` and paste your Client ID and Client Secret into `.env`
- `node server.js`

## Spotify API Documentation

The following docs are highly relevant to this project:

- [authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)

- [get current user's profile](https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/)

- [get a user's top artists and tracks](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/)

- [get a current user's recently played tracks (beta)](https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/)

- [create playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/)

- [add items to a playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/)

<!---
## Media Credits
-->
