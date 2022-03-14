import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:8888/login"
        >
          Log in to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
