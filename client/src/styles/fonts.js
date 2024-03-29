import { css } from 'styled-components/macro';

// https://stackoverflow.com/a/41678350
const fonts = css`
  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/CircularStd-Book.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/CircularStd-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/CircularStd-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;
