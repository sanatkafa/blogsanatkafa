import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collider from './Collider';
import { AppContext } from '../AppContext';

class BackgroundCollider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    collisionId: PropTypes.string.isRequired,
  };

  colliderRef = React.createRef();

  render() {
    const { collisionId, children } = this.props;
    return (
      <AppContext.Consumer>
        {({ updateBGBoundingBox, removeBGBoundingBox }) => (
          <Collider
            updateBoundingBox={updateBGBoundingBox}
            removeBoundingBox={removeBGBoundingBox}
            collisionId={collisionId}
            colliderRef={this.colliderRef}
            ref={this.colliderRef}
          >
            {children}
          </Collider>
        )}
      </AppContext.Consumer>
    );
  }
}

export default BackgroundCollider;
