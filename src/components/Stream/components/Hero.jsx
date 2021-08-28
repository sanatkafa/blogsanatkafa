import React, { PureComponent } from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { IMAGE_SIZE_FLUID } from '../../../lib/constants';
import { getPostUrl } from '../../../lib/get-url';
import { getMediaImage } from '../../../lib/utils';

import FallbackImage from './common/FallbackImage';
import CategoryLabel from '../../CategoryLabel';
import Link from '../../Link';

import { tablet, mobile, mobileAndTablet } from '../../../styles/media-queries';
import { streamComponentStyle } from '../styles/common';

class Hero extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    displayCategory: PropTypes.shape({
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      parentCategory: PropTypes.string,
      slug: PropTypes.string,
    }),
    featured_media: PropTypes.shape({}).isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  render() {
    const { className, title, slug, featured_media, displayCategory } = this.props;

    if (!title) {
      return null;
    }
    const media = getMediaImage(featured_media, IMAGE_SIZE_FLUID);

    const ratio = `${(0.929 - 1 / (media && media.aspectRatio)) * 100}%`; // 593x551
    return (
      <Link className={className} to={getPostUrl({ pathOnly: true, slug })}>
        <div className="desktop-hero">
          {(media && <Img fluid={media} alt={title} style={{ paddingBottom: ratio }} />) || (
            <FallbackImage />
          )}
        </div>
        <div className="hero__meta">
          <CategoryLabel displayCategory={displayCategory} shouldEnableCategoryLink={false} />
          <div className="hero__title LineClamp">
            <span>{he.decode(title)}</span>
          </div>
        </div>
      </Link>
    );
  }
}

const HeroStyled = styled(Hero)`
  ${streamComponentStyle}
  position: relative;
  display: block;

  .hero__meta {
    position: absolute;
    bottom: 0;
    left: -32px;
    padding-bottom: 24px;

    ${mobileAndTablet`
      left: -8px;
      padding-bottom: 16px;
    `};
  }

  ${FallbackImage} {
    width: 100%;
    height: 400px;
  }

  .hero__title {
    width: 90%;
    ${({ theme }) => theme.fonts.xlBold};
    max-height: 156.24px;

    ${tablet`
      ${({ theme }) => theme.fonts.xlBold};
    `}

    ${mobile`
      ${({ theme }) => theme.fonts.mBold};
      -webkit-line-clamp: 3;
      max-height: 64.8px; // 3 * 18 * 1.2
      letter-spacing: normal;
    `};
    margin: 12px 0;

    // displaying multi-line background
    span {
      background-color: #fff;
      display: inline;
      padding-right: 20px;
      box-decoration-break: clone;

      ${mobileAndTablet`
        padding-right: 12px;
      `};
    }
  }
`;
export default HeroStyled;
