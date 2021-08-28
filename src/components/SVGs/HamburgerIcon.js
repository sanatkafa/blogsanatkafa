import React, { PureComponent } from 'react';

class HamburgerIcon extends PureComponent {
  render() {
    return (
      <svg width="21px" height="8px" viewBox="0 0 21 8">
        <g fill="#000" fillRule="evenodd">
          <path d="M0 0h21v2H0zM0 6h21v2H0z" />
        </g>
      </svg>
    );
  }
}

export default HamburgerIcon;
