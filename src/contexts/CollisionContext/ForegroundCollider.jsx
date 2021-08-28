import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Collider from './Collider';
import { AppContext } from '../AppContext';

class ForegroundCollider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    collisionId: PropTypes.string.isRequired,
  };

  colliderRef = React.createRef();

  render() {
    const { collisionId, children } = this.props;
    return (
      <AppContext.Consumer>
        {({ updateFGBoundingBox, removeFGBoundingBox, collisions }) => (
          <Collider
            updateBoundingBox={updateFGBoundingBox}
            removeBoundingBox={removeFGBoundingBox}
            collisions={collisions}
            collisionId={collisionId}
            ref={this.colliderRef}
            colliderRef={this.colliderRef}
          >
            {children}
          </Collider>
        )}
      </AppContext.Consumer>
    );
  }
}

export default ForegroundCollider;
