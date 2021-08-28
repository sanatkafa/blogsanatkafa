import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchIcon extends PureComponent {
  static propTypes = {
    fillColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#000',
  };

  render() {
    const { fillColor } = this.props;
    return (
      <svg viewBox="0 0 32 32">
        <path
          d="M0 13.5A13.5 13.5 0 0 0 21.9 24l7.6 7.6a1.5 1.5 0 0 0 2 0c.6-.6.6-1.5 0-2.1L24 21.9a13.5 13.5 0 1 0-24-8.4zM13.5 24a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21z"
          fill={fillColor}
          fillRule="evenodd"
        />
      </svg>
    );
  }
}

export default SearchIcon;
