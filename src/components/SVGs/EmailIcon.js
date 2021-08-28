import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { desktop } from '../../styles/media-queries';

class EmailIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} width="33px" height="33px" viewBox="0 0 33 33">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle fill="#000" cx="16.5" cy="16.5" r="16.5" />
          <path
            d="M10.5316514,12.8723676 L17,18.6686792 L23.4683486,12.8723676 C23.6740016,12.6880812 23.6913226,12.3719729 23.5070362,12.16632 C23.4121917,12.0604789 23.2767876,12 23.1346686,12 L10.8653314,12 C10.589189,12 10.3653314,12.2238576 10.3653314,12.5 C10.3653314,12.642119 10.4258103,12.7775231 10.5316514,12.8723676 Z M9,13.6207356 L9,21 C9,21.5522847 9.44771525,22 10,22 L24,22 C24.5522847,22 25,21.5522847 25,21 L25,13.6207356 C25,13.3445932 24.7761424,13.1207356 24.5,13.1207356 C24.3768312,13.1207356 24.2579961,13.1661977 24.1662774,13.2484061 L17.244093,19.4528302 C17.1036899,19.5766038 16.8963101,19.5766038 16.755907,19.4528302 L9.83372264,13.2484061 C9.62809078,13.0640962 9.3119805,13.0813811 9.12767058,13.2870129 C9.04546211,13.3787317 9,13.4975667 9,13.6207356 Z"
            stroke="#000"
            strokeWidth="0.5"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    );
  }
}

export default styled(EmailIcon)`
  ${desktop`
    max-width: 25px;
  `};

  g {
    &:hover circle {
      ${({ theme }) => `
        fill: ${theme.iconHoverColors.emailBlue};
        transition: fill ${theme.transitions.fast} linear;
      `};
    }
    &:hover path {
      ${({ theme }) => `
        stroke: ${theme.iconHoverColors.emailBlue}
        transition: stroke ${theme.transitions.fast} linear;
      `};
    }
  }
`;
