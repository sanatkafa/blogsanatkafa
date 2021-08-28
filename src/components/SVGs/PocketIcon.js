import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { desktop } from '../../styles/media-queries';

class PocketIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} width="33px" height="33px" viewBox="0 0 33 33">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-94, -430)">
            <g transform="translate(94, 430)">
              <circle fill="#000000" cx="16.5" cy="16.5" r="16.5" />
              <polyline
                stroke="#fff"
                strokeWidth="3.961386"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="10 14 16.7554704 20.7272727 23.4545455 14.0561599"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default styled(PocketIcon)`
  ${desktop`
    max-width: 25px;
  `};

  g {
    &:hover circle {
      ${({ theme }) => `
        fill: ${theme.iconHoverColors.pocketPink};
        transition: fill ${theme.transitions.fast} linear;
      `};
    }
  }
`;
