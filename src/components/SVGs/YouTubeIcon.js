import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class YouTubeIcon extends PureComponent {
  static propTypes = {
    fillColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#000',
  };

  render() {
    return (
      <svg width="24px" height="18px" viewBox="0 0 24 18">
        <path
          d="M15 9.4L10.4 12c-.7.4-.8 0-.8-.6V8.9c0-3.4 0-3.4 3-1.8L15 8.5c.5.3.6.5 0 .9m8.5-4.8C23.3 2 22.3.9 19.9.8 14.6.5 9.3.5 4 .8 2 .9.8 1.8.5 3.8-.1 7.4 0 11 .5 14.7c.2 1.7 1.4 2.6 3 2.8 2.9.3 5.6.2 8.7.3 2.4-.1 5 0 7.7-.3 2.5-.2 3.4-1.1 3.7-3.7.3-3 .3-6.1 0-9.2"
          fill={this.props.fillColor}
          fillRule="evenodd"
        />
      </svg>
    );
  }
}

export default YouTubeIcon;
