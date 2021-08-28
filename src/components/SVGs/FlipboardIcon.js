import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { desktop } from '../../styles/media-queries';

class FlipboardIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} width="33px" height="33px" viewBox="0 0 33 33">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle fill="#000" cx="16.5" cy="16.5" r="16.5" />
          <path
            d="M14.7659574,19.3333333 L14.7659574,24 L10,24 L10,10 L14.7659574,10 L24,10 L24,14.8172043 L19.2340426,14.8172043 L19.2340426,19.3333333 L14.7659574,19.3333333 Z"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    );
  }
}

export default styled(FlipboardIcon)`
  ${desktop`
    max-width: 25px;
  `};

  g {
    &:hover circle {
      ${({ theme }) => `
        fill: ${theme.iconHoverColors.flipboardRed};
        transition: fill ${theme.transitions.fast} linear;
      `};
    }
  }
`;
