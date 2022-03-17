import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';

import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';

import { Login, Profile } from './pages';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`;

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <GlobalStyle />

      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>

            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<h1>Top Artists</h1>}>
                </Route>
                <Route path="/top-tracks" element={<h1>Top Tracks</h1>}>
                </Route>
                <Route path="/playlists/:id" element={<h1>Playlist ID</h1>}>
                </Route>
                <Route path="/playlists" element={<h1>Playlists</h1>}>
                </Route>
                <Route path="/" element={<Profile />}>
                </Route>
              </Routes>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
