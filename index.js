require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const authorizeURL = 'https://accounts.spotify.com/authorize';
  const query = {
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scopes,
    redirect_uri: REDIRECT_URI,
    state: state,
  };
  res.redirect(`${authorizeURL}?${querystring.stringify(query)}`);
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {

        const { access_token, token_type } = response.data;

        axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })
          .then(response => {
            res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
          })
          .catch(error => {
            res.send(error);
          });

      } else {
        res.send(response);
      }
    })
    .catch(error => {
      res.send(error);
    });
});
