import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class BlurWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    shouldBlur: PropTypes.bool,
  };

  render() {
    const { className, children } = this.props;
    return <div className={className}>{children}</div>;
  }
}

export default styled(BlurWrapper)`
  transition-duration: ${({ theme }) => theme.transitions.slow};
  ${({ shouldBlur }) => shouldBlur && 'filter: blur(20px);'}
`;
