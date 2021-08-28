import React, { PureComponent } from 'react';
import get from 'lodash/get';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getMediaImage } from '../../../lib/utils';
import { IMAGE_SIZE_FLUID } from '../../../lib/constants';
import { getPostUrl } from '../../../lib/get-url';
import { desktop, mobile, tablet, mobileAndTablet } from '../../../styles/media-queries';
import { streamComponentStyle, topOverlayLabel, smallCategoryImageSize } from '../styles/common';
import CategoryTextOverlay from './common/CategoryTextOverlay';
import FallbackImage from './common/FallbackImage';
import Link from '../../Link';

class SmallBackgroundCategory extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    showSummary: PropTypes.bool,
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

    const content = (
      <div className="small-category">
        <div className="small-category__image-wrapper">
          <div className="small-category__background" />
          {(media && <Img fluid={media} alt={title} />) || <FallbackImage />}
        </div>
        <CategoryTextOverlay displayCategory={displayCategory} title={title} summary={dek} />
      </div>
    );

    return (
      <Link className={className} to={getPostUrl({ pathOnly: true, slug })}>
        {content}
      </Link>
    );
  }
}

const SmallBackgroundCategoryStyled = styled(SmallBackgroundCategory)`
  ${streamComponentStyle}

  ${mobileAndTablet`
    margin: 0;
  `};

  ${CategoryTextOverlay} {
    ${desktop`
      left: 45px;
      right: 10px;
    `}
  }

  .gatsby-image-wrapper,
  ${FallbackImage} {
    ${smallCategoryImageSize}
  }

  .small-category__image-wrapper {
    position: relative;
    z-index: 0;
  }

  .small-category__background {
    position: absolute;
    top: 58px;
    bottom: 0;
    left: 0;
    right: 58px;

    ${tablet`
      left: 24px;
      top: 24px;
      bottom: -24px;
      right: 0;
    `};

    ${mobile`
      left: 18px;
      top: 18px;
      bottom: -18px;
      right: 0;
    `};

    background-color: ${({ displayCategory, theme }) =>
      theme.colors[get(displayCategory, ['color'])] || theme.colors.nude};
  }

  ${topOverlayLabel};
`;

export default SmallBackgroundCategoryStyled;
