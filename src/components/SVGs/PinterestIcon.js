import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PinterestIcon extends PureComponent {
  static propTypes = {
    fillColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#000',
  };

  render() {
    return (
      <svg width="19px" height="23px" viewBox="0 0 19 23">
        <path
          d="M4.6 22.3c-.6-2.1-.3-4 .1-6 .2-1.2.6-2.3.9-3.5.4-1.3.7-2.7.2-4.1-.3-.9.2-1.7.6-2.4C7 5.4 8 5 9 5.4c1.1.5 1.2 1.4 1 2.4-.2 1-.6 2-.9 2.9-.4 1.6-.1 2.6 1 3 1.2.6 2.7.1 3.5-1 1.3-2 1.8-4.2 1.4-6.4-.3-2.4-2.8-4-5.3-3.9-3.6.2-5.8 2-6.4 5.3a4 4 0 0 0 .4 2.6l.5 1c.2.6.1 1.2-.4 1.5-.6.5-1 0-1.4-.4A5.7 5.7 0 0 1 .8 7C1.8 2.7 5.6.2 10.4.4c4.5.3 7.3 2.4 7.9 6.3.4 2.8-.7 6.8-3.7 8.5-2.2 1.3-4.4 1.5-6.6-.4-.6 2.8-1.3 5.3-3.4 7.5z"
          fill={this.props.fillColor}
          fillRule="evenodd"
        />
      </svg>
    );
  }
}

export default PinterestIcon;
