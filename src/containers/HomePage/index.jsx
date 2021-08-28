import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HorizontalCaret from '../../components/SVGs/HorizontalCaret';
import Layout from '../Layout';
import Link from '../../components/Link';
import Trending from '../../components/TrendingSection';
import FeaturedHero from '../../components/Stream/components/Hero';
import FeaturedCarousel from '../../components/Stream/components/Carousel';
import LatestPostsList from '../../components/Stream/components/List';
import IndexLayout from '../Layout/IndexLayout';
import { mobile } from '../../styles/media-queries';

class HomePage extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    featuredPosts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
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
    latestPosts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
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
  };

  render() {
    /**
     * 4 featured stores
     * - 1 Hero
     * - 3 trending
     *
     * 22 Latest news
     * - 6 trending
     * - 16 main
     */
    const { className, featuredPosts, latestPosts, location, hasPaginatedPosts } = this.props;

    return (
      <Layout className={className} location={location} pageType="home">
        <IndexLayout
          hero={<FeaturedHero {...featuredPosts[0]} />}
          trending={<Trending posts={latestPosts.slice(0, 6)} />}
          carousel={<FeaturedCarousel posts={featuredPosts.slice(1, 4)} />}
          main={<LatestPostsList posts={latestPosts.slice(6, 22)} showCategoryColor={false} />}
          footer={
            <MoreStories hasPaginatedPosts={hasPaginatedPosts}>
              <Link to="/2">
                Daha Fazla İçerik
                <HorizontalCaret />
              </Link>
            </MoreStories>
          }
        />
      </Layout>
    );
  }
}

const MoreStories = styled.div`
  ${({ theme }) => theme.fonts.mBold}
  ${({ hasPaginatedPosts }) => (hasPaginatedPosts ? 'display: block;' : 'display: none;')}
  margin-bottom: ${({ theme }) => theme.layoutSpacing.xxl};

  ${mobile`
    margin-bottom: ${({ theme }) => theme.layoutSpacing.xl};
  `}

  ${Link} {
    text-transform: uppercase;
    display: flex;
    justify-content: center;
  }
`;

export default HomePage;
