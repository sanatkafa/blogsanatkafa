import React, { PureComponent } from 'react';
import get from 'lodash/get';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mobile, tablet, mobileAndTablet } from '../../../styles/media-queries';
import { getMediaImage } from '../../../lib/utils';
import { IMAGE_SIZE_FLUID } from '../../../lib/constants';
import { getPostUrl } from '../../../lib/get-url';
import { streamComponentStyle, topOverlayLabel, largeCategoryImageSize } from '../styles/common';
import CategoryTextOverlay from './common/CategoryTextOverlay';
import FallbackImage from './common/FallbackImage';
import Link from '../../Link';

class LargeBackgroundCategory extends PureComponent {
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
      <div className="large-category">
        <div className="large-category__image-wrapper">
          <div className="large-category__background" />
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

const LargeBackgroundCategoryStyled = styled(LargeBackgroundCategory)`
  ${streamComponentStyle}

  ${mobileAndTablet`
    margin: 0;
    margin-top: 18px;
  `};

  .large-category {
    position: relative;
    margin-bottom: 50px;
  }

  .gatsby-image-wrapper,
  ${FallbackImage} {
    ${largeCategoryImageSize}
  }

  .large-category__image-wrapper {
    position: relative;
    z-index: 0;
  }

  .large-category__background {
    position: absolute;
    background-color: ${({ displayCategory, theme }) =>
      get(displayCategory, ['color']) || theme.colors.nude};
    left: 0;
    right: 0;
    top: 50px;
    bottom: -50px;

    ${tablet`
      top: 24px;
      bottom: -24px;
    `}

    ${mobile`
      top: 18px;
      bottom: -18px;
    `};
  }

  ${topOverlayLabel}
`;

export default LargeBackgroundCategoryStyled;
