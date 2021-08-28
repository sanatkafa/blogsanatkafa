import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { desktop, mobile } from '../../styles/media-queries';

class HorizontalCaret extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    direction: PropTypes.string,
  };

  render() {
    return (
      <div className={this.props.className}>
        <svg width="17" height="9" viewBox="0 0 17 9">
          <path
            d="M16.44.88l-7.6 6.84L1.24.88"
            stroke="#000"
            strokeWidth="1.596"
            fill="none"
            fillRule="evenodd"
          />
        </svg>{' '}
      </div>
    );
  }
}

export default styled(HorizontalCaret)`
  transform: ${({ direction }) => (direction === 'left' ? 'rotateZ(90deg)' : 'rotateZ(-90deg)')};

  svg {
    ${mobile`
      height: 6px;
    `};
  }

  ${desktop`
    padding: 0 8px;
  `};
`;
