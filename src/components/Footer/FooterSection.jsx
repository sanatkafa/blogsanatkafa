import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { mobile, tablet } from '../../styles/media-queries';

class FooterSection extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const { className, title, children } = this.props;

    return (
      <div className={className}>
        <div className="footer-section-header">{he.decode(title)}</div>
        <div>{children}</div>
      </div>
    );
  }
}

export default styled(FooterSection)`
  flex: 1;
  padding: 0 10px;
  ${tablet`
    padding: 0 8px;
  `};

  ${mobile`
    display: inline-block;
    flex-wrap: wrap;
    padding-bottom: 46px;
    padding-right: 28px;
  `};

  .footer-section-header {
    padding-bottom: 24px;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.mBold};
    text-transform: uppercase;
  }
`;
