import React, { PureComponent } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import get from 'lodash/get';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { getMediaImage } from '../../lib/utils';
import { IMAGE_SIZE_FLUID } from '../../lib/constants';
import { mobile } from '../../styles/media-queries';
import { getImageUrl } from '../../lib/get-url';

import Link from '../Link';
import CategoryLabel from '../CategoryLabel';
import { BackgroundCollider } from '../../contexts/CollisionContext';

class PostImage extends PureComponent {
  static propTypes = {
    caption: PropTypes.node,
    className: PropTypes.string,
    creditName: PropTypes.string,
    creditLink: PropTypes.string,
    displayCategory: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      parentCategory: PropTypes.string,
      slug: PropTypes.string,
    }),
    featured_media: PropTypes.shape({}).isRequired,
    shouldAlignTextRight: PropTypes.bool,
    shouldEnableCategoryLink: PropTypes.bool,
    isLongForm: PropTypes.bool,
  };

  static defaultProps = {
    caption: null,
    creditName: null,
    creditLink: null,
    displayCategory: null,
    isLongForm: false,
    shouldAlignTextRight: false,
    shouldEnableCategoryLink: true,
  };

  constructor(props) {
    super(props);
    this.state = { fixedImage: {} };
  }

  onImageLoaded = ({ target }) => {
    const { naturalWidth, naturalHeight } = target;
    this.setState({
      fixedImage: {
        width: naturalWidth,
        height: naturalHeight,
      },
    });
  };

  loadImage = (url) => {
    const image = new Image();
    image.onload = this.onImageLoaded;
    image.src = url;
  };

  getFixedImageElement = () => {
    const { caption, featured_media: featuredMedia } = this.props;
    const { width, height } = this.state.fixedImage;
    const imageHeight = get(featuredMedia, 'media_details.height', 0) || height;
    const imageWidth = get(featuredMedia, 'media_details.width', 0) || width;

    if (!imageHeight && typeof window !== 'undefined') {
      // passing onLoad to image could have race condition (image load before onLoad attached)
      this.loadImage(featuredMedia.source_url);
    }
    return (
      <AspectRatio
        ratio={`${imageWidth}/${imageHeight}`}
        style={{ width: '100%', maxWidth: `${imageWidth}px` }}
      >
        <img src={featuredMedia.source_url} alt={caption} onLoad={this.onImageLoaded} />
        <meta content={featuredMedia.source_url} />
      </AspectRatio>
    );
  };

  getFluidImageElement = (fluidMedia) => {
    const { caption, featured_media: featuredMedia } = this.props;
    return (
      <>
        <Img fluid={fluidMedia} alt={caption} />
        <meta
          itemProp="url"
          content={getImageUrl({
            slug: get(getMediaImage(featuredMedia, IMAGE_SIZE_FLUID), ['src']),
          })}
        />
      </>
    );
  };

  getImage = () => {
    const { featured_media: featuredMedia, displayCategory, isLongForm } = this.props;
    const fluidMedia = getMediaImage(featuredMedia, IMAGE_SIZE_FLUID);
    const imageElement = fluidMedia
      ? this.getFluidImageElement(fluidMedia)
      : this.getFixedImageElement();
    if (isLongForm) {
      return (
        <BackgroundCollider collisionId={`header-${displayCategory.slug || ''}`}>
          {imageElement}
        </BackgroundCollider>
      );
    }
    return <>{imageElement}</>;
  };

  render() {
    const {
      caption,
      className,
      creditLink,
      creditName,
      displayCategory,
      shouldEnableCategoryLink,
    } = this.props;

    return (
      <div className={className}>
        <div className="image-caption-wrapper">
          {this.getImage()}
          {displayCategory && (
            <div className="category-label-wrapper">
              <CategoryLabel
                displayCategory={displayCategory}
                shouldEnableCategoryLink={shouldEnableCategoryLink}
              />
            </div>
          )}
        </div>
        {(!!creditName || !!caption) && (
          <div className="photo-text">
            {creditName && (
              <div className="photo-credit">
                Fotoğraf:
                {creditLink ? (
                  <Link decorate={false} to={creditLink}>
                    {he.decode(creditName)}
                  </Link>
                ) : (
                  he.decode(creditName)
                )}
              </div>
            )}
            {caption && (
              <div className="photo-caption" dangerouslySetInnerHTML={{ __html: caption }} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default styled(PostImage)`
  img {
    width: 100%;
    margin: 0;
  }

  .image-caption-wrapper {
    display: flex;
    flex-direction: column;
  }

  .category-label-wrapper {
    display: flex;
    justify-content: center;
    transform: translateY(-50%);
  }

  .photo-text {
    display: flex;
    flex-direction: column;
    align-items: ${({ shouldAlignTextRight }) => (shouldAlignTextRight ? 'flex-end' : 'normal')};
    padding: ${({ shouldAlignTextRight }) => (shouldAlignTextRight ? '0 20px' : '16px 0')};
    border-bottom: 1px solid
      ${({ theme, isLongForm }) => (isLongForm ? 'transparent' : theme.colors.lightgrey)};
    color: ${({ theme }) => theme.colors.grey};
    margin-top: ${({ isLongForm }) => (isLongForm ? '-18px' : '0px')};
    ${mobile`
      margin-bottom: 18px;
    `}

    .photo-credit {
      ${({ theme }) => theme.fonts.xs};
    }

    ${Link} {
      color: ${({ theme }) => theme.colors.grey};
    }

    .photo-caption {
      ${({ theme }) => theme.fonts.xs};
      p {
        margin: 0;
        line-height: 1.3em;
      }
    }
  }
`;
