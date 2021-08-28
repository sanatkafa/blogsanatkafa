import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class FacebookShareIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} viewBox="0 0 33 33">
        <g fill="none" fillRule="evenodd">
          <circle fill="#000" cx="16.5" cy="16.5" r="16.5" />
          <path
            d="M15.101 22.775l.023-5.568H13.66a.66.66 0 0 1-.66-.66l.001-1.19a.66.66 0 0 1 .66-.659h1.455a67.445 67.445 0 0 1 0-1.819c.065-1.925 1.257-2.913 3.443-2.878h.82a.66.66 0 0 1 .66.66v.896a.66.66 0 0 1-.727.656 3.354 3.354 0 0 0-.455-.012c-.957.032-1.258.33-1.285 1.283-.004.145-.006.55-.005 1.214h1.516a.66.66 0 0 1 .66.664l-.007 1.189a.66.66 0 0 1-.66.656h-1.504l-.004 5.57a.66.66 0 0 1-.66.66h-1.147a.66.66 0 0 1-.66-.662z"
            fill="#FFF"
          />
        </g>
      </svg>
    );
  }
}

export default styled(FacebookShareIcon)`
  g {
    &:hover circle {
      ${({ theme }) => `
        fill: ${theme.iconHoverColors.facebookBlue};
        transition: fill ${theme.transitions.fast} linear;
      `};
    }
  }
`;
