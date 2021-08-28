import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class PinterestShareIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} viewBox="0 0 33 33">
        <g fill="none" fillRule="evenodd">
          <circle fill="#000" cx="16.5" cy="16.5" r="16.5" />
          <path
            d="M13.602 23.289c-.406-1.37-.202-2.642.055-3.903.154-.764.38-1.516.592-2.268.252-.893.457-1.774.146-2.705-.189-.563.085-1.084.4-1.55.403-.594.972-.9 1.711-.592.717.299.806.907.65 1.541-.16.646-.409 1.27-.59 1.911-.302 1.07-.09 1.694.657 2.027.757.338 1.744.038 2.292-.766.859-1.262 1.175-2.673.944-4.147-.24-1.526-1.84-2.623-3.526-2.53-2.352.13-3.777 1.325-4.206 3.489-.12.606.033 1.143.288 1.676.101.21.241.407.316.625.133.386.077.788-.262 1.03-.38.272-.718-.046-.954-.277-1.037-1.019-1.294-2.273-1.004-3.616.587-2.713 3.147-4.402 6.321-4.22 2.96.168 4.782 1.528 5.163 4.095.27 1.822-.44 4.444-2.384 5.581-1.466.857-2.898.943-4.36-.31-.414 1.84-.855 3.513-2.25 4.909z"
            fill="#FFF"
          />
        </g>
      </svg>
    );
  }
}

export default styled(PinterestShareIcon)`
  g {
    &:hover circle {
      ${({ theme }) => `
        fill: ${theme.iconHoverColors.pinterestRed};
        transition: fill ${theme.transitions.fast} linear;
      `};
    }
  }
`;
