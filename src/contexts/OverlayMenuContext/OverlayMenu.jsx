import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';
import { isDesktop } from '../../lib/utils';

class OverlayMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    menuID: PropTypes.string.isRequired,
  };

  shouldRenderMenu = (expandedMenu) => this.overlayMenuExpanded(expandedMenu) || isDesktop();

  overlayMenuExpanded = (expandedMenu) => {
    const { menuID } = this.props;
    return expandedMenu === menuID ? 'menuExpanded' : undefined;
  };

  render() {
    const { children } = this.props;
    return (
      <AppContext.Consumer>
        {({ expandedMenu }) =>
          this.shouldRenderMenu(expandedMenu) && (
            <span className={this.overlayMenuExpanded(expandedMenu)}>{children}</span>
          )
        }
      </AppContext.Consumer>
    );
  }
}

export default OverlayMenu;
