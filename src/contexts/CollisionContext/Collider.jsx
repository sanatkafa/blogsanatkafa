import React, { PureComponent } from 'react';
import { subscribe } from 'subscribe-ui-event';
import PropTypes from 'prop-types';
import { isDesktop } from '../../lib/utils';

class Collider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    collisionId: PropTypes.string.isRequired,
    updateBoundingBox: PropTypes.func.isRequired,
    removeBoundingBox: PropTypes.func.isRequired,
    collisions: PropTypes.shape({}),
  };

  static defaultProps = {
    collisions: {},
  };

  subscriptions = [];

  elementRef = React.createRef();

  SCREEN_SIZES = {
    DESKTOP: 'desktop',
    TABLET_OR_SMALLER: 'tablet or smaller',
  };

  prevScreenSize = undefined;

  componentDidMount() {
    this.screenSizeCallback = subscribe('resize', this.resizeCallback, {
      enableScrollInfo: true,
      useRAF: true,
      eventOptions: {
        passive: true,
      },
    });
    if (isDesktop()) {
      this.subscribeToUIEvents();
      this.prevScreenSize = this.SCREEN_SIZES.DESKTOP;
      this.updateBoundingBox();
    } else {
      this.prevScreenSize = this.SCREEN_SIZES.TABLET_OR_SMALLER;
    }
  }

  componentDidUpdate() {
    this.updateBoundingBox();
  }

  componentWillUnmount() {
    this.unsubscribeUIEvents();
    this.screenSizeCallback.unsubscribe();
    this.removeBoundingBox();
  }

  subscribeToUIEvents = () => {
    this.subscriptions = [
      subscribe('scroll', this.updateBoundingBox, {
        enableScrollInfo: true,
        useRAF: true,
        throttleRate: 15,
        eventOptions: {
          passive: true,
        },
      }),
      subscribe('resize', this.updateBoundingBox, {
        enableScrollInfo: true,
        useRAF: true,
        throttleRate: 15,
        eventOptions: {
          passive: true,
        },
      }),
    ];
  };

  unsubscribeUIEvents = () => {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  };

  updateBoundingBox = () => {
    if (this.elementRef.current) {
      this.props.updateBoundingBox(
        this.props.collisionId,
        this.elementRef.current.getBoundingClientRect()
      );
    }
  };

  removeBoundingBox = () => {
    this.props.removeBoundingBox(this.props.collisionId);
  };

  resizeCallback = () => {
    if (isDesktop() && this.prevScreenSize === this.SCREEN_SIZES.TABLET_OR_SMALLER) {
      this.subscribeToUIEvents();
      this.prevScreenSize = this.SCREEN_SIZES.DESKTOP;
      this.updateBoundingBox();
    } else if (!isDesktop() && this.prevScreenSize === this.SCREEN_SIZES.DESKTOP) {
      this.unsubscribeUIEvents();
      this.prevScreenSize = this.SCREEN_SIZES.TABLET_OR_SMALLER;
    }
  };

  render() {
    const { children, collisionId, collisions } = this.props;
    return (
      <span ref={this.elementRef} className={collisions[collisionId] ? 'collides' : undefined}>
        {children}
      </span>
    );
  }
}

export default Collider;
