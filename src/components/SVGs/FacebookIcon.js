import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FacebookIcon extends PureComponent {
  static propTypes = {
    fillColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#000',
  };

  render() {
    return (
      <svg width="12px" height="23px" viewBox="0 0 12 23">
        <path
          d="M3.5 22V12h-3a.5.5 0 0 1-.5-.4V8.4c0-.3.2-.5.5-.5h3v-3c.1-3.3 2.1-5 5.8-4.9h2c.2 0 .5.2.5.5v2.8a.5.5 0 0 1-.7.5l-1.3-.1c-1.6 0-2.1.5-2.2 2.1v2h3.2a.5.5 0 0 1 .5.6v3.2c0 .2-.3.5-.5.5H7.6V22c0 .3-.2.5-.5.5h-3a.5.5 0 0 1-.6-.5z"
          fill={this.props.fillColor}
          fillRule="evenodd"
        />
      </svg>
    );
  }
}

export default FacebookIcon;
