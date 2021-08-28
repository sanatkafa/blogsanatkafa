import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HOMEPAGE_STREAM_ITEM, RELATED_POST } from '../../../lib/constants';

import FeaturedStreamItem from './FeaturedStreamItem';

import { desktop, mobile } from '../../../styles/media-queries';

class Carousel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        author_name: PropTypes.string,
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
      })
    ),
    streamItemType: PropTypes.oneOf([HOMEPAGE_STREAM_ITEM, RELATED_POST]),
  };

  static defaultProps = {
    streamItemType: HOMEPAGE_STREAM_ITEM,
  };

  render() {
    const { className, posts, streamItemType } = this.props;
    if (!posts || !posts.length) {
      return null;
    }

    return (
      <div className={className}>
        <ul className="carousel">
          {posts.map((post) => (
            <li className="carousel__item" key={post.slug}>
              <FeaturedStreamItem streamItemType={streamItemType} {...post} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const CarouselStyled = styled(Carousel)`
  .carousel {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    ${mobile`
      justify-content: start;
    `};

    list-style: none;
    margin: 0;
  }

  .carousel__item {
    ${desktop`
      margin-right: 24px;
    `}
    flex-basis: 33%;
    text-align: center;
  }
`;

export default CarouselStyled;
