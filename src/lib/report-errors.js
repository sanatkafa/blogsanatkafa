import get from 'lodash/get';

/**
 * startErrorReporting reports any javascript errors the user will encounter to Google Analytics.
 */
const startErrorReporting = () => {
  if (get(window, 'ga')) {
    window.addEventListener('error', ({ error }) => {
      window.ga('send', 'exception', {
        exDescription: `ERROR: ${error.message}. STACK: ${error.stack}.`,
      });
    });
  }
};

export default startErrorReporting;
