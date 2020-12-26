const TOP = (type, time_range, limit, offset=0) => {
    return `https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`;
};

const AUTH = 'https://accounts.spotify.com/authorize?';
const TOKEN = 'https://accounts.spotify.com/api/token';

module.exports = {
    topEP: TOP,
    authEP: AUTH,
    tokenEP: TOKEN
};
