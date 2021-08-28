import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CategoryLabel from '../../../CategoryLabel';
import Summary from './Summary';
import Title from './Title';

import { mobile, tablet } from '../../../../styles/media-queries';

class CategoryTextOverlay extends PureComponent {
  render() {
    const { className, displayCategory, title, summary } = this.props;

    return (
      <div className={className}>
        <CategoryLabel displayCategory={displayCategory} shouldEnableCategoryLink={false} />
        <Title text={title} className="LineClamp" />
        <Summary text={summary} size="m" className="LineClamp" />
      </div>
    );
  }
}

export default styled(CategoryTextOverlay)`
  position: absolute;
  background: #fff;

  padding: ${({ theme }) => theme.layoutSpacing.l};
  padding-top: 12px;

  bottom: -100px;
  left: 100px;
  right: -100px;

  ${Title} {
    ${({ theme }) => theme.fonts.l}
    -webkit-line-clamp: 2;
    max-height: 78.4px;
    margin-bottom: 12px;
    ${mobile`
      ${({ theme }) => theme.fonts.mlSemibold}
      margin: 16px 0;
      padding: 0;
      -webkit-line-clamp: 3;
      max-height: 72px; // 3 * 20 * 1.2
    `}
  }

  ${mobile`
    padding: ${({ theme }) => theme.layoutSpacing.s};
    padding-top: 12px;
    bottom: calc(-${({ theme }) => theme.layoutSpacing.s} + -${({ theme }) =>
    theme.layoutSpacing.s});
    left: calc(${({ theme }) => theme.layoutSpacing.s} + ${({ theme }) => theme.layoutSpacing.s});
    right: -${({ theme }) => theme.layoutSpacing.s};
  `}

  ${tablet`
    padding: ${({ theme }) => theme.layoutSpacing.m};
    padding-top: 8px;
    bottom: calc(-${({ theme }) => theme.layoutSpacing.m} + -${({ theme }) =>
    theme.layoutSpacing.m});
    left: calc(${({ theme }) => theme.layoutSpacing.m} + ${({ theme }) => theme.layoutSpacing.m});
    right: -${({ theme }) => theme.layoutSpacing.m};
  `}
`;
