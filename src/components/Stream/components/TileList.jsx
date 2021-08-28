import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mobile, tablet } from '../../../styles/media-queries';
import Rectangle from './Rectangle';

class TileList extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
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
  };

  // group every two posts
  getGroupedArray(posts) {
    return posts.reduce((result, value, index, array) => {
      if (index % 2 === 0) result.push(array.slice(index, index + 2));
      return result;
    }, []);
  }

  render() {
    const { className, posts } = this.props;

    if (!posts || !posts.length) {
      return null;
    }
    const groupedPosts = this.getGroupedArray(posts);

    return (
      <div className={className}>
        <div className="stream-list">
          {groupedPosts.map((postSection, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="stream-list__row" key={i}>
              {postSection.map((post) => (
                <Rectangle {...post} key={post.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const TileListStyled = styled(TileList)`
  display: flex;
  justify-content: space-around;
  .stream-list {
    display: flex;
    flex-direction: column;
  }
  .stream-list__row {
    margin: 20px 0;

    :first-child,
    :first-child > * {
      margin-top: 0;
    }
  }
  ${Rectangle} {
    margin-right: 65px;
    ${mobile`
      margin: 20px 0;
    `};
    ${tablet`
      margin: 24px 12px;
    `};
  }
`;

export default TileListStyled;
