import React, { PureComponent } from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HOMEPAGE_STREAM_ITEM, IMAGE_SIZE_FLUID, RELATED_POST } from '../../../lib/constants';
import { getMediaImage } from '../../../lib/utils';
import { getPostUrl } from '../../../lib/get-url';

import FallbackImage from './common/FallbackImage';
import Title from './common/Title';
import CategoryLabel from '../../CategoryLabel';
import Link from '../../Link';

import { mobile, tablet } from '../../../styles/media-queries';
import { streamComponentStyle, bottomOverlayLabel } from '../styles/common';

class FeaturedStreamItem extends PureComponent {
  static propTypes = {
    displayCategory: PropTypes.shape({
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      parentCategory: PropTypes.string,
      slug: PropTypes.string,
    }),
    featured_media: PropTypes.shape({}),
    slug: PropTypes.string,
    streamItemType: PropTypes.oneOf([HOMEPAGE_STREAM_ITEM, RELATED_POST]).isRequired,
    title: PropTypes.string,
  };

  getImageElement = () => {
    const { featured_media: featuredMedia, title } = this.props;
    const media = getMediaImage(featuredMedia, IMAGE_SIZE_FLUID);
    if (media) {
      const ratio = `${(1.01724 - 1 / (media && media.aspectRatio)) * 100}%`; // to create a rect of 290x295
      return <Img fluid={media} alt={title} style={{ paddingBottom: ratio }} />;
    }
    if (featuredMedia && featuredMedia.source_url) {
      return <FixedImg sourceUrl={featuredMedia.source_url} />;
    }
    return <FallbackImage />;
  };

  render() {
    const { className, slug, title, displayCategory } = this.props;

    if (!title) {
      return null;
    }

    const content = (
      <div className="stream-item-featured">
        <div className="stream-item-featured__image-wrapper">
          {this.getImageElement()}
          <CategoryLabel displayCategory={displayCategory} shouldEnableCategoryLink={false} />
        </div>
        <div className="stream-item-featured__title">
          <Title text={title} size="s" className="LineClamp" />
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

const FixedImg = styled.div`
  height: 204px;
  width: 201px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.sourceUrl});

  ${mobile`
    width: 190px;
    height: 195px;
  `};
`;

const FeaturedStreamItemStyled = styled(FeaturedStreamItem)`
  ${streamComponentStyle}
  text-align: center;
  width: 100%;

  ${tablet`
    padding-right: 30px;
  `};

  ${mobile`
    padding-right: 14px;
  `};

  ${Title} {
    margin: 30px auto;
    padding: 0;
    -webkit-line-clamp: 3;
    max-height: 64.8px;

    ${mobile`
      max-height: 57.6px; // 3 * 16 * 1.2
    `};
  }

  ${FallbackImage} {
    width: 100%;
    height: 300px;
  }

  .stream-item-featured {
    .gatsby-image-wrapper,
    ${FallbackImage} {
      margin: auto;

      ${mobile`
        width: 190px;
        height: 195px;
      `};
    }
  }

  .stream-item-featured__image-wrapper {
    position: relative;
  }

  ${bottomOverlayLabel};
`;

export default FeaturedStreamItemStyled;
