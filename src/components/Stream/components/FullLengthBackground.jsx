import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';

import { getMediaImage } from '../../../lib/utils';
import { IMAGE_SIZE_FLUID } from '../../../lib/constants';
import { desktop, mobileAndTablet, mobile, tablet } from '../../../styles/media-queries';
import { streamComponentStyle, fullLengthContainer } from '../styles/common';
import FallbackImage from './common/FallbackImage';
import Link from '../../Link';
import Title from './common/Title';
import Summary from './common/Summary';
import { BackgroundCollider } from '../../../contexts/CollisionContext';
import { getPostUrl } from '../../../lib/get-url';

class FullLengthBackground extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    dek: PropTypes.string,
    featured_media: PropTypes.shape({}),
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.number,
  };

  render() {
    const { className, title, slug, featured_media } = this.props;

    if (!title) {
      return null;
    }

    const media = getMediaImage(featured_media, IMAGE_SIZE_FLUID);

    return (
      <Link className={className} to={getPostUrl({ pathOnly: true, slug })}>
        <div className="full-length-background__meta">
          <BackgroundCollider collisionId={`full-length-background-${slug}`}>
            <div className="full-length-background__title">
              <Title text={this.props.title} size="xl" className="LineClamp" />
              <Summary text={this.props.dek} size="l" />
            </div>
          </BackgroundCollider>
        </div>
        <div className="full-length-background__image-wrapper">
          {(media && <Img fluid={media} alt={title} />) || <FallbackImage />}
          <div className="full-length-background__image-mask" />
        </div>
      </Link>
    );
  }
}

const FullLengthBackgroundStyled = styled(FullLengthBackground)`
  ${streamComponentStyle}
  ${fullLengthContainer}
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobileAndTablet`
    justify-content: flex-start;
  `}
  background-color: ${({ showCategoryColor, displayCategory, theme }) =>
    showCategoryColor
      ? theme.colors[displayCategory.color] || theme.colors.black
      : theme.colors.black};
  color: #fff;
  padding: 0 200px;
  position: relative;
  ${Title} {
    ${({ theme }) => theme.fonts.xlBold};
    -webkit-line-clamp: 2;
    padding-top: 0;
    line-height: 1;
    max-height: 84px;
    margin-bottom: 26px;
    padding-bottom: 0;

    ${tablet`
      max-width: 55vw;
    `}

    ${mobile`
      -webkit-line-clamp: 5;
      max-height: 120.0px; // 5 * 20 * 1.2
      margin-bottom: 8px;
      ${({ theme }) => theme.fonts.mlBold};
      letter-spacing: -0.57px;
      line-height: 1.2;
      max-width: 40vw;
    `}
  }

  ${desktop`
    height: 295px;
    margin-left: -272px; // 240 + 32;
    margin-right: -${({ theme }) => theme.layoutSpacing.l};
  `}

  ${mobileAndTablet`
    padding: 0 16px;
  `};

  ${tablet`
    height: 280px;
  `};

  ${mobile`
    height: 170px;
  `};

  .full-length-background__meta {
    z-index: 1;
    max-width: 56%;
    ${desktop`
      max-width: 70%;
    `}
    line-height: 1;
    position: relative;
    height: 100%;

    .nav-collision-container {
      height: 100%;
    }

    .full-length-background__title {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    ${desktop`
      left: -6%;
    `}

    ${mobileAndTablet`
      max-width: 80%;
      margin-left: 4%;
    `};
  }

  ${Summary} {
    line-height: 1.2;
    font-weight: 500;
    ${mobileAndTablet`
      display: none;
    `}
  }

  .full-length-background__image-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    .gatsby-image-wrapper, ${FallbackImage}{
      height: 295px;
      width: 410px;

      ${tablet`
        height: 280px;
        width: 360px;
      `}
      ${mobile`
        height: 170px;
        width: 260px;
      `};
    }
  }

  .full-length-background__image-mask {
    position: absolute;
    top: 0;
    border-style: solid;
    border-width: 0 0 295px 100px;
    border-color: transparent transparent transparent
      ${({ showCategoryColor, displayCategory, theme }) =>
        showCategoryColor ? displayCategory.color || theme.colors.black : theme.colors.black};
      ${tablet`
      border-width: 0 0 280px 100px;
    `};

    ${mobile`
      border-width: 0 0 170px 100px;
    `};
  }
`;

export default FullLengthBackgroundStyled;
