import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class InstagramIcon extends PureComponent {
  static propTypes = {
    fillColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#000',
  };

  render() {
    return (
      <svg width="22px" height="22px" viewBox="0 0 22 22">
        <g transform="translate(.4 .4)" fill="none" fillRule="evenodd">
          <path
            d="M18.8 15.2c0 2.6-1.5 4-4 4.1H6.4c-2.6 0-4-1.5-4-4.3v-4.3-4.5C2.4 4 3.9 2.5 6 2.3c3-.2 6-.2 8.9 0 2.2.2 3.7 1.6 3.8 4v9m1.7-9.5C20.1 2 18.1.5 14.5.4H6C3 .7.7 2.9.6 6c-.2 3.2-.2 6.4 0 9.6 0 3.1 1.8 5 4.7 5.5 3.2.5 6.5.4 9.7.2 3.5-.3 5-1.8 5.5-5.5.4-3.3.4-6.6 0-10"
            fill={this.props.fillColor}
          />
          <path
            d="M17.2 5.2c-.1.7-.5 1.2-1.2 1.2S15 6 14.8 5.3c0-.8.5-1.3 1.2-1.3.8 0 1 .6 1.2 1.2M10.5 14.2a3.4 3.4 0 0 1-3.3-3.4c0-1.9 1.6-3.5 3.5-3.5 1.8 0 3.1 1.6 3.1 3.5 0 2.1-1.2 3.4-3.3 3.4m.2-8.8c-2.8 0-5.4 2.6-5.4 5.5S7.7 16 10.6 16c3 0 5.1-2.3 5.2-5.3 0-2.9-2.4-5.3-5.1-5.4"
            fill={this.props.fillColor}
          />
        </g>
      </svg>
    );
  }
}

export default InstagramIcon;
