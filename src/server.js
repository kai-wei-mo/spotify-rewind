// basic node.js script for Authorization Code OAuth2 flow
// authenticate contre Spotify Accounts Services
// for more info: https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express'); // express web server framework
const path = require('path');
const querystring = require('querystring');
const request = require('request'); // the "request" library

const endpoint = require('./endpoint.js');


require ('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPE = process.env.SCOPE;

let stateKey = 'spotify_auth_state';

let app = express();

let generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization
  res.redirect(endpoint.authEP +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPE,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
});

app.get('/callback', function(req, res) {
  // check state parameter
  // request refresh and access tokens

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: endpoint.tokenEP,
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        let access_token = body.access_token,
            refresh_token = body.refresh_token;

        let type = 'artists';
        let time_range = 'short_term';
        let limit = 3;
        let offset = 0;
        let options = {
          // shows on console
          url: endpoint.topEP(type, time_range, limit, offset),
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

      } else {
        // if user denies permissions, reprompt auth.
        // alternative design: return to home page, do not reprompt auth (?)
        let state = generateRandomString(16);
        res.cookie(stateKey, state);

        // application requests authorization, we've seen this before
        res.redirect(endpoint.authEP +
          querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPE,
            redirect_uri: REDIRECT_URI,
            state: state
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // request access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: endpoint.tokenEP,
    headers: { 'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
