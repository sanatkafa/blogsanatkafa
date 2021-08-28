import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../contexts/AppContext';
import { OverlayMenuCloser, OverlayMenuExpander } from '../../contexts/OverlayMenuContext';

import CloseIcon from '../SVGs/CloseIcon';
import HamburgerIcon from '../SVGs/HamburgerIcon';

import { mobileAndTablet } from '../../styles/media-queries';

const OverlayMenuTogglerContainer = styled.span`
  display: none;
  ${mobileAndTablet`
    display: block;
  `};
`;

class OverlayMenuToggler extends Component {
  renderToggleButton = (expandedMenu) => {
    if (expandedMenu) {
      return (
        <OverlayMenuCloser>
          <CloseIcon />
        </OverlayMenuCloser>
      );
    }
    return (
      <OverlayMenuExpander menuID="nav">
        <HamburgerIcon />
      </OverlayMenuExpander>
    );
  };

  render() {
    return (
      <AppContext.Consumer>
        {({ expandedMenu }) => (
          <OverlayMenuTogglerContainer>
            {this.renderToggleButton(expandedMenu)}
          </OverlayMenuTogglerContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default OverlayMenuToggler;
