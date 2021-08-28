import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class FallbackImage extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return <div className={this.props.className} />;
  }
}

const FallbackImageStyles = styled(FallbackImage)`
  position: relative;
  background: rgba(0, 0, 0, 0.2);
`;

export default FallbackImageStyles;
