import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = ({ className, fillColor }) => (
  <svg className={className} width="15px" height="16px" viewBox="0 0 15 16">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-23, -95)" fill={fillColor}>
        <g transform="translate(23, 95)">
          <rect
            transform="translate(7.5, 8) rotate(45) translate(-7.5, -8) "
            x="-1.76470588"
            y="7.11111111"
            width="18.5294118"
            height="1.77777778"
          />
          <rect
            transform="translate(7.5, 8) rotate(-45) translate(-7.5, -8) "
            x="-1.76470588"
            y="7.11111111"
            width="18.5294118"
            height="1.77777778"
          />
        </g>
      </g>
    </g>
  </svg>
);

CloseIcon.propTypes = {
  className: PropTypes.string,
  fillColor: PropTypes.string,
};

CloseIcon.defaultProps = {
  className: null,
  fillColor: '#000',
};

export default CloseIcon;
