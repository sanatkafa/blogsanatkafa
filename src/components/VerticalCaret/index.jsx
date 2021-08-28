import React, { PureComponent } from 'react';
import styled from 'styled-components';

class VerticalCaret extends PureComponent {
  render() {
    const { onClick, isExpanded, className } = this.props;
    return (
      <CaretWrapper isExpanded={isExpanded} className={className} onClick={onClick}>
        {' '}
        &#9660;{' '}
      </CaretWrapper>
    );
  }
}

const CaretWrapper = styled.div`
  cursor: pointer;
  font-size: 10px;
  left: 6px;
  position: relative;

  ${({ isExpanded }) =>
    isExpanded &&
    `
    transform: rotate(180deg);
    top: -2px;
  `}
`;

export default VerticalCaret;
