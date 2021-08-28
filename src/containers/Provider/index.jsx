import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';

import AppProvider from '../../contexts/AppContext';
import theme from '../../styles/theme';

const Provider = ({ children }) => (
  <Location>
    {({ location }) => (
      <ThemeProvider theme={theme}>
        <AppProvider>
          <ToastProvider>{cloneElement(children, { location })}</ToastProvider>
        </AppProvider>
      </ThemeProvider>
    )}
  </Location>
);

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
