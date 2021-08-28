import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { desktop, mobile, tablet, mobileAndTablet } from '../../styles/media-queries';

class IndexLayout extends PureComponent {
  render() {
    const { className, footer, hero, trending, carousel, main, billboard, center } = this.props;
    return (
      <div className={className}>
        {billboard && <section className="col-billboard">{billboard}</section>}
        <div className="col layout-top">
          {hero && <section className="col-hero">{hero}</section>}
          {trending && <section className="col-trending">{trending}</section>}
          {carousel && <section className="col-carousel">{carousel}</section>}
        </div>
        <section className="col">
          <div className="main">{main}</div>
        </section>
        {center && <section className="center">{center}</section>}
        <section className="col layout-bottom">{footer}</section>
      </div>
    );
  }
}

export default styled(IndexLayout)`
  // Common style
  .col {
    margin-left: 180px;

    ${mobileAndTablet`
      margin-left: 0;
    `};
  }

  .layout-top {
    display: flex;
    flex-flow: row wrap;

    .col-hero {
      flex-basis: 63%;

      ${desktop`
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 64px;
      `}

      margin-bottom: ${({ theme }) => theme.layoutSpacing.l};

      ${mobileAndTablet`
        flex-basis: 100%;
      `};
    }

    .col-trending {
      flex: 1;
      flex-basis: 30%;
      flex-grow: 0;
      flex-shrink: 0;

      ${desktop`
        max-width: 215px;
        margin-right: auto;
      `}

      ${mobileAndTablet`
        flex-basis: 100%;
        order: 3;
        padding-top: 34px;
        padding-bottom: 14px;
        :: before {
          content: ' ';
          display: block;
          height: 7px;
          width: 100%;
          background: ${({ theme }) => theme.colors.black};
        }
      `};
    }

    .col-carousel {
      flex: 1 100%;

      ${mobileAndTablet`
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
      `};

      ${mobile`
        margin-right: -${({ theme }) => theme.layoutSpacing.s};
      `}

      ${tablet`
        margin-right: -${({ theme }) => theme.layoutSpacing.m};
      `};
    }
  }
  .center {
    max-width: 768px;
    margin: auto;
  }

  .col-billboard {
    ${desktop`
      margin-left: -${({ theme }) => theme.layoutSpacing.l};
      margin-right: -${({ theme }) => theme.layoutSpacing.l};
    `};
    ${tablet`
      margin-left: -${({ theme }) => theme.layoutSpacing.m};
      margin-right: -${({ theme }) => theme.layoutSpacing.m};
    `};
    ${mobile`
      margin-left: -${({ theme }) => theme.layoutSpacing.s};
      margin-right: -${({ theme }) => theme.layoutSpacing.s};
    `};
  }

  .page-toggles {
    ${({ theme }) => theme.fonts.l}
    text-transform: uppercase;
    display: flex;
    padding: 0 60px 120px;

    ${mobile`
      ${({ theme }) => theme.fonts.s}
      padding: 0 0 40px 0;
    `}
  }
`;
