import { css } from 'styled-components';

const fontSizes = {
  xxs: '8px',
  xs: '12px',
  s: '16px',
  m: '18px',
  ml: '20px',
  l: '26px',
  xl: '42px',
  xxl: '85px',
  xxxl: '200px',
};

const fontFamily = '"ProximaNova", sans-serif';

const theme = {
  borderRadii: {
    s: '2px',
    m: '5px',
    l: '8px',
  },
  colors: {
    black: '#000',
    blue: '#031ee5',
    cyan: '#239dda',
    darkgrey: '#7c7c7c',
    green: '#26e7c7',
    grey: '#898989',
    lightgrey: '#dadfe6',
    nude: '#ec9993',
    pink: '#fc3078',
    purple: '#9013fe',
    rose: '#fd5068',
    silver: '#c6c9cf',
    white: '#fff',
  },
  fonts: {
    xxs: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xxs};
      font-weight: 400;
    `,
    xs: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xs};
      font-weight: 400;
    `,
    xsSemibold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xs};
      font-weight: 600;
    `,
    xsBold: css`
      font-family: ${fontFamily};
      font-weight: 800;
      font-size: ${fontSizes.xs};
    `,
    s: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.s};
      font-weight: 400;
    `,
    sSemibold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.s};
      font-weight: 600;
    `,
    sBold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.s};
      font-weight: 800;
    `,
    m: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.m};
      font-weight: 400;
    `,
    mBold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.m};
      font-weight: 800;
    `,
    ml: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.ml};
      font-weight: 400;
    `,
    mlBold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.ml};
      font-weight: 800;
      letter-spacing: -0.5px;
    `,
    mlSemibold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.ml};
      font-weight: 600;
      letter-spacing: -0.5px;
    `,
    l: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.l};
      font-weight: 600;
    `,
    xlBold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xl};
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.24;
    `,
    xxl: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xxl};
      font-weight: 400;
      letter-spacing: -4px;
    `,
    xxlBold: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xxl};
      font-weight: 800;
      letter-spacing: -4px;
    `,
    xxxl: css`
      font-family: ${fontFamily};
      font-size: ${fontSizes.xxxl};
      font-weight: 800;
      letter-spacing: -4px;
    `,
  },
  gradients: {
    pink: 'linear-gradient(260deg, #ff7854, #fd267d)',
  },
  iconHoverColors: {
    emailBlue: '#239dda',
    facebookBlue: '#375ba4',
    flipboardRed: '#cc0000',
    linkGrey: '#c6c9cf',
    pinterestRed: '#ea2215',
    pocketPink: '#ef4056',
    redditOrange: '#ed572b',
    twitterBlue: '#2cabe0',
    teal: '#50b5c1',
    tumblrBlue: '#017BB5',
    weHeartItPink: '#ff4075',
  },
  nav: {
    width: '260px',
    bottom: '150px',
    mobileTop: '117px',
    mobileTopCompact: '50px',
  },
  transitions: {
    fast: '150ms',
    slow: '300ms',
  },
  zIndex: {
    nav: '1',
    mobileNav: '2',
    header: '2',
    mobileShareToolTip: '3',
    desktopShareToolTip: '1',
    search: '3',
    floatingTdrBtn: 1,
  },
  layoutSpacing: {
    s: '18px',
    m: '24px',
    l: '32px',
    xl: '44px',
    xxl: '90px',
  },
};

export const clearFix = css`
  :before,
  :after {
    content: ' ';
    display: table;
  }
  :after {
    clear: both;
  }
`;

export default theme;
