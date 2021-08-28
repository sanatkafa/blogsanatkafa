import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import he from 'he';

import { mobile } from '../../../../styles/media-queries';

class Summary extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const { className, text } = this.props;
    if (!text) {
      return null;
    }
    return <div className={className}>{he.decode(text)}</div>;
  }
}

const SummaryStyles = styled(Summary)`
  ${({ theme, size }) => {
    switch (size) {
      case 'm':
        return theme.fonts.m;
      case 'l':
      default:
        return theme.fonts.l;
    }
  }};

  ${mobile`
    ${({ theme, size }) => {
      switch (size) {
        case 's':
          return theme.fonts.xs;
        case 'm':
          return theme.fonts.s;
        case 'l':
        default:
          return theme.fonts.m;
      }
    }};
  `};

  line-height: 1.1;
`;

export default SummaryStyles;
