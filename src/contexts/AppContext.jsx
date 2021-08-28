import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { subscribe } from 'subscribe-ui-event';
import { isDesktop } from '../lib/utils';

export const AppContext = React.createContext({
  collisions: {},
  updateFGBoundingBox: () => {},
  updateBGBoundingBox: () => {},
  removeFGBoundingBox: () => {},
  removeBGBoundingBox: () => {},
  expandedMenu: undefined,
  expandMenu: () => {},
  closeMenu: () => {},
  isMobile: undefined,
});

class AppProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  SCREEN_SIZES = {
    DESKTOP: 'desktop',
    TABLET_OR_SMALLER: 'tablet or smaller',
  };

  recalculateCollisions = throttle(() => {
    const newCollisions = {};
    Object.keys(this.fgBoundingBoxes).forEach((navRectKey) => {
      newCollisions[navRectKey] = Object.keys(this.bgBoundingBoxes).some((navCollisionKey) =>
        this.isMajorCollision(
          this.fgBoundingBoxes[navRectKey],
          this.bgBoundingBoxes[navCollisionKey]
        )
      );
    });
    if (JSON.stringify(this.collisions) !== JSON.stringify(newCollisions)) {
      this.collisions = newCollisions;
      this.forceUpdate();
    }
  }, 10);

  constructor(props) {
    super(props);
    this.bgBoundingBoxes = {};
    this.fgBoundingBoxes = {};
    this.collisions = {};
    this.state = {
      expandedMenu: undefined,
      isMobile: !isDesktop(),
      yScrollPosition: this.yScrollPosition(),
      screenSize: isDesktop() ? this.SCREEN_SIZES.DESKTOP : this.SCREEN_SIZES.TABLET_OR_SMALLER,
    };
  }

  componentDidMount() {
    this.screenSizeCallback = subscribe('resize', this.resizeCallback, {
      enableScrollInfo: true,
      useRAF: true,
      eventOptions: {
        passive: true,
      },
    });
    this.closeMenu();
  }

  updateBGBoundingBox = (collisionId, newBoundingBox) => {
    this.bgBoundingBoxes[collisionId] = newBoundingBox;
    this.recalculateCollisions();
  };

  removeBGBoundingBox = (collisionId) => {
    delete this.bgBoundingBoxes[collisionId];
    this.recalculateCollisions();
  };

  updateFGBoundingBox = (collisionId, newBoundingBox) => {
    this.fgBoundingBoxes[collisionId] = newBoundingBox;
    this.recalculateCollisions();
  };

  removeFGBoundingBox = (collisionId) => {
    delete this.fgBoundingBoxes[collisionId];
    this.recalculateCollisions();
  };

  isMajorCollision = (smallRect, bigRect) =>
    smallRect.top + smallRect.height / 2 >= bigRect.top &&
    smallRect.bottom - smallRect.height / 2 <= bigRect.bottom;

  resizeCallback = () => {
    if (isDesktop() && this.state.screenSize === this.SCREEN_SIZES.TABLET_OR_SMALLER) {
      this.setState({ isMobile: false, screenSize: this.SCREEN_SIZES.DESKTOP });
      this.closeMenu();
    } else {
      this.setState({ isMobile: true, screenSize: this.SCREEN_SIZES.TABLET_OR_SMALLER });
    }
  };

  expandMenu = (menuID) => {
    if (this.state.screenSize === this.SCREEN_SIZES.TABLET_OR_SMALLER) {
      this.setState({ expandedMenu: menuID, yScrollPosition: this.yScrollPosition() }, () => {
        document.documentElement.classList.add('mobile-menu-expanded');
      });
    }
  };

  closeMenu = () => {
    this.setState({ expandedMenu: undefined }, () => {
      document.documentElement.classList.remove('mobile-menu-expanded');
      if (typeof window !== 'undefined') {
        window.scrollTo(0, this.state.yScrollPosition);
      }
      this.setState({ yScrollPosition: undefined });
    });
  };

  yScrollPosition = () => {
    if (typeof window !== 'undefined') {
      return (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    }
    return 0;
  };

  render() {
    const { children } = this.props;
    const providerValue = {
      collisions: this.collisions,
      updateBGBoundingBox: this.updateBGBoundingBox,
      removeBGBoundingBox: this.removeBGBoundingBox,
      updateFGBoundingBox: this.updateFGBoundingBox,
      removeFGBoundingBox: this.removeFGBoundingBox,
      expandedMenu: this.state.expandedMenu,
      isMobile: this.state.isMobile,
      expandMenu: this.expandMenu,
      closeMenu: this.closeMenu,
    };

    return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
  }
}

export default AppProvider;
