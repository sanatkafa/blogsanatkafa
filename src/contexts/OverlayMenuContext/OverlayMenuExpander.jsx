import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';

const OverlayMenuExpander = ({ children, menuID }) => (
  <AppContext.Consumer>
    {({ expandMenu }) => (
      <span
        onClick={() => {
          expandMenu(menuID);
        }}
      >
        {children}
      </span>
    )}
  </AppContext.Consumer>
);

OverlayMenuExpander.propTypes = {
  children: PropTypes.node.isRequired,
  menuID: PropTypes.string.isRequired,
};

export default OverlayMenuExpander;
