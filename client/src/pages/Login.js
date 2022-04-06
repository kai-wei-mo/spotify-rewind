import styled from 'styled-components/macro';

const BACKEND_URI = process.env.REACT_APP_DEPLOYMENT === 'PROD' ? process.env.REACT_APP_BACKEND_URI_PROD : process.env.REACT_APP_BACKEND_URI_DEV;

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Login = () => (
  <StyledLoginContainer>
    <StyledLoginButton href={`${BACKEND_URI}/login`}>
      Log in to Spotify
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;
