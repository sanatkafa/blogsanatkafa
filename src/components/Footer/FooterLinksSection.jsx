import React, { PureComponent } from 'react';
import styled from 'styled-components';
import he from 'he';

import FooterSection from './FooterSection';
import Link from '../Link';

class FooterLinksSection extends PureComponent {
  render() {
    const { className, title, links = [] } = this.props;
    return (
      <FooterSection classsName={className} title={title}>
        {links.map((link) => (
          <FooterLink key={link.id} to={link.url}>
            {he.decode(link.title)}
          </FooterLink>
        ))}
      </FooterSection>
    );
  }
}

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  display: block;
  line-height: 24px;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

export default FooterLinksSection;
