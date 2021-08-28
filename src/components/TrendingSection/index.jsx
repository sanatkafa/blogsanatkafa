import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { getPostUrl } from '../../lib/get-url';

import Link from '../Link';

import { desktop, mobile, mobileAndTablet } from '../../styles/media-queries';

class TrendingSection extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        dek: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
  };

  render() {
    const { className, posts } = this.props;

    if (!posts || !posts.length) {
      return null;
    }

    return (
      <aside className={className}>
        <div className="section-title">Trendler</div>
        <ul className="trending-list">
          {posts.map((post) => (
            <li className="trending-item" key={post.id}>
              <Link to={getPostUrl({ pathOnly: true, slug: post.slug })}>
                <div className="item-text">
                  <div className="title LineClamp" title={he.decode(post.title)}>
                    {he.decode(post.title)}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

const TrendingStyled = styled(TrendingSection)`
  ${mobileAndTablet`
    padding: 24px 12px;
  `};

  .section-title {
    ${({ theme }) => theme.fonts.sBold}
    text-transform: uppercase;
  }

  .trending-list {
    list-style: none;
    margin-left: 0;
  }

  .trending-item {
    margin: 20px 0;
    word-wrap: break-word;
    ${({ theme }) => theme.fonts.m}
    ${mobile`
      ${({ theme }) => theme.fonts.s};
      line-height: 18px;
      margin: 19px 0;
    `};

    ${desktop`
      .title {
        line-height: 1.5;
        // 3 line * font-size * line-height 3 * 18 * 1.5
        max-height: 81px;
        -webkit-line-clamp: 3;
      }
    `}

    .item-text {
      margin-bottom: 4px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default TrendingStyled;
