import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import he from 'he';

import { mobile } from '../../../../styles/media-queries';

class Title extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const { className, text } = this.props;
    return <div className={className}>{he.decode(text)}</div>;
  }
}

const TitleStyles = styled(Title)`
  line-height: 1.2;
  letter-spacing: normal;
  padding: 16px 0;

  ${({ theme, size }) => {
    switch (size) {
      case 'xl':
        return theme.fonts.xlBold;
      case 's':
        return theme.fonts.m;
      case 'l':
      default:
        return theme.fonts.l;
    }
  }};

  ${mobile`
    ${({ theme, size }) => {
      switch (size) {
        case 'xl':
          return theme.fonts.l;
        case 's':
          return theme.fonts.s;
        case 'l':
        default:
          return theme.fonts.l;
      }
    }};
  `};
`;

export default TitleStyles;
