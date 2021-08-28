const { css } = require('styled-components');

// starting from the smallest screen size and going up
exports.tabletBreakpoint = 768; // tablet starts here, anything smaller is mobile
exports.desktopBreakpoint = 1250; // desktop starts here, anything smaller is mobile or tablet

exports.mobile = (...args) => css`
  @media only screen and (max-width: ${exports.tabletBreakpoint - 1}px) {
    ${css(...args)};
  }
`;

exports.tablet = (...args) => css`
  @media only screen and (min-width: ${exports.tabletBreakpoint}px) and (max-width: ${exports.desktopBreakpoint -
    1}px) {
    ${css(...args)};
  }
`;

exports.desktop = (...args) => css`
  @media only screen and (min-width: ${exports.desktopBreakpoint}px) {
    ${css(...args)};
  }
`;

exports.tabletAndDesktop = (...args) => css`
  @media only screen and (min-width: ${exports.tabletBreakpoint}px) {
    ${css(...args)};
  }
`;

exports.mobileAndTablet = (...args) => css`
  @media only screen and (max-width: ${exports.desktopBreakpoint - 1}px) {
    ${css(...args)};
  }
`;
