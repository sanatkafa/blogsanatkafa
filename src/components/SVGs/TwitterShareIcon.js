import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class TwitterShareIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} viewBox="0 0 33 33">
        <g fill="none" fillRule="evenodd">
          <circle fill="#000" cx="16.5" cy="16.5" r="16.5" />
          <path
            d="M10.596 11.57c.857.904 1.77 1.697 2.908 2.173.725.303 1.453.565 2.254.613.364.022.513-.006.512-.425-.009-2.506 2.89-3.807 4.583-2.27.228.208.446.204.717.102.372-.14.758-.241 1.175-.37.023.515-.456.712-.666 1.133l.734.11c.047.33-.167.479-.342.604-.534.382-.626.902-.642 1.518-.096 3.72-3.347 7.042-7.05 7.243-2.192.118-3.327-.11-4.779-1.016 1.267-.314 2.597-.23 3.59-1.288-1.114-.234-1.928-.752-2.32-1.841l.769-.122c-.62-.522-1.27-.898-1.57-1.582-.137-.31-.321-.715-.225-.987.142-.402.556.194.878-.096-.865-1.008-1.211-2.133-.526-3.5z"
            fill="#FFF"
          />
        </g>
      </svg>
    );
  }
}

export default styled(TwitterShareIcon)`
  g {
    &:hover circle {
      ${({ theme }) => `
        fill: ${theme.iconHoverColors.twitterBlue};
        transition: fill ${theme.transitions.fast} linear;
      `};
    }
  }
`;
