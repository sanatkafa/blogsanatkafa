import React from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../AppContext';

const OverlayMenuCloser = ({ children }) => (
  <AppContext.Consumer>
    {({ closeMenu }) => <span onClick={closeMenu}>{children}</span>}
  </AppContext.Consumer>
);

OverlayMenuCloser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OverlayMenuCloser;
