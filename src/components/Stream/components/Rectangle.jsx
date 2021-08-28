import React, { PureComponent } from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getMediaImage } from '../../../lib/utils';
import { IMAGE_SIZE_FLUID } from '../../../lib/constants';
import { getPostUrl } from '../../../lib/get-url';
import { mobile, tablet, mobileAndTablet } from '../../../styles/media-queries';
import { streamComponentStyle, bottomOverlayLabel } from '../styles/common';
import CategoryLabel from '../../CategoryLabel';
import Link from '../../Link';
import Summary from './common/Summary';
import Title from './common/Title';
import FallbackImage from './common/FallbackImage';

class Rectangle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    order: PropTypes.number,
    dek: PropTypes.string,
    displayCategory: PropTypes.shape({
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      parentCategory: PropTypes.string,
      slug: PropTypes.string,
    }),
    featured_media: PropTypes.shape({}),
    slug: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const { className, featured_media, slug, title, dek, displayCategory } = this.props;

    if (!title) {
      return null;
    }

    const media = getMediaImage(featured_media, IMAGE_SIZE_FLUID);
    const ratio = `${(0.864 - 1 / (media && media.aspectRatio)) * 100}%`; // to create a rect of 405*350
    const image = (media && <Img fluid={media} alt={title} style={{ paddingBottom: ratio }} />) || (
      <FallbackImage />
    );
    const content = (
      <div className="rectangle">
        <div className="rectangle__image-wrapper">
          {image}
          <CategoryLabel displayCategory={displayCategory} shouldEnableCategoryLink={false} />
        </div>
        <div className="rectangle__title">
          <Title text={title} size="l" className="LineClamp" />
          <Summary text={dek} className="LineClamp" />
        </div>
      </div>
    );

    return (
      <Link className={className} to={getPostUrl({ pathOnly: true, slug })}>
        {content}
      </Link>
    );
  }
}

const RectangleStyled = styled(Rectangle)`
  ${streamComponentStyle}
  vertical-align: top;
  width: 405px;

  .gatsby-image-wrapper {
    max-height: 350px;
    ${tablet`
      max-height: 285px;
    `}
  }

  ${mobile`
    width: 100%;
  `}

  ${tablet`
    width: 330px;
  `}

  ${FallbackImage} {
    width: 405x;
    height: 350px;
    margin: auto;

    ${mobileAndTablet`
      width: calc(100vw - 36px);
      height: calc(100vw - 36px);
    `};
  }

  .rectangle__title {
    margin: auto;
    text-align: center;
    padding-top: 13px; // account for the category tag
    ${Title} {
      -webkit-line-clamp: 2;
      max-height: 63.96px;
      line-height: 1.23;
      padding-top: 0;
      padding-bottom: 0;
      margin: 16px 0;
    }
    ${Summary} {
      -webkit-line-clamp: 2;
      line-height: 1.125;
      ${({ theme }) => theme.fonts.m};
      max-height: 40.5px;
      ${mobile`
        ${({ theme }) => theme.fonts.s};
        max-height: 36.0px; // 2 * 16 * 1.125
      `}
    }
  }

  .rectangle__image-wrapper {
    position: relative;
  }

  ${bottomOverlayLabel}
`;

export default RectangleStyled;
