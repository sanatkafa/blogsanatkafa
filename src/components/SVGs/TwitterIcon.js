import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class TwitterIcon extends PureComponent {
  static propTypes = {
    fillColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#000',
  };

  render() {
    return (
      <svg width="20px" height="18px" viewBox="0 0 20 18">
        <path
          d="M1.8 6.9C.5 5.3 0 3.5 1 1.4 2.3 2.8 3.7 4 5.5 4.8c1 .5 2.2.9 3.4 1 .6 0 .8 0 .8-.7 0-4 4.4-6 7-3.6.3.3.6.3 1 .2l1.8-.6c0 .8-.7 1.1-1 1.8l1.1.1c.1.6-.2.8-.5 1-.8.6-1 1.4-1 2.4A12 12 0 0 1 7.4 17.7c-3.3.2-5-.1-7.3-1.5 2-.5 4-.4 5.5-2-1.7-.4-3-1.3-3.5-3 .3 0 .7 0 1.1-.2-.9-.8-1.9-1.4-2.3-2.4C.6 8 .4 7.4.5 7c.2-.6.9.3 1.3-.1"
          fill={this.props.fillColor}
          fillRule="evenodd"
        />
      </svg>
    );
  }
}

export default TwitterIcon;
