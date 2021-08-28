import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { mobile, desktop } from '../../styles/media-queries';
import Layout from '../Layout';
import Trending from '../../components/TrendingSection';
import FeaturedHero from '../../components/Stream/components/Hero';
import FeaturedCarousel from '../../components/Stream/components/Carousel';
import TileList from '../../components/Stream/components/TileList';
import FullLengthBackground from '../../components/Stream/components/FullLengthBackground';
import IndexLayout from '../Layout/IndexLayout';
import { TAXONOMIES } from '../../lib/constants';

class CategoryPage extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    displayCategory: PropTypes.shape({
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      parentCategory: PropTypes.string,
      slug: PropTypes.string,
    }),
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
  };

  render() {
    const { className, posts, location, displayCategory, parentSlug } = this.props;

    // Posts slice into differnt size to fit UI design
    // Top heor module (1 story)
    const heroPost = posts[0];
    // Carousel module (3 story)
    const carouselPosts = posts.slice(1, 4);
    // Trending module (6 story)
    const trendingPosts = posts.slice(4, 10);
    // One full length module (1 story)
    const fullLengthBackgroundPosts = posts.slice(10, 11)[0];
    // all the rest
    const restPosts = posts.slice(11);

    const title = displayCategory.name;
    return (
      <Layout
        className={className}
        location={location}
        canonical={displayCategory.url}
        metatitle={title}
        ogTitle={title}
        twitterTitle={title}
        metadesc={displayCategory.description}
        ogDescription={displayCategory.description}
        twitterDescription={displayCategory.description}
        taxonomy={TAXONOMIES.category}
        parentSlug={parentSlug}
        pageType="category"
        pageSlug={displayCategory.slug}
      >
        <IndexLayout
          hero={
            <>
              {heroPost && <FeaturedHero {...heroPost} displayCategory={displayCategory} />}
              <div className="category-meta">
                <h2 className="category-meta__title">{he.decode(displayCategory.name)}</h2>
                <p
                  className="category-meta__description"
                  dangerouslySetInnerHTML={{ __html: displayCategory.description }}
                />
              </div>
            </>
          }
          trending={trendingPosts && <Trending posts={trendingPosts} />}
          carousel={carouselPosts && <FeaturedCarousel posts={carouselPosts} />}
          main={
            <div className="list">
              {fullLengthBackgroundPosts && <FullLengthBackground {...fullLengthBackgroundPosts} />}
              {restPosts && <TileList posts={restPosts} />}
            </div>
          }
        />
      </Layout>
    );
  }
}

export default styled(CategoryPage)`
  .category-meta {
    border-top: 7px solid ${({ displayCategory, theme }) =>
      theme.colors[displayCategory.color] || theme.colors.nude};
    margin-top: 30px;
    ${mobile`
      marin: 18px 0;
    `};
  }
  .category-meta__title {
    text-transform: uppercase;
    font-style: italic;
    ${({ theme }) => theme.fonts.l};
    margin-top: 12px;
    margin-bottom: 6px;

    ${mobile`
      ${({ theme }) => theme.fonts.m};
      font-weight: bold;
    `};
    }
  }
  
  ${TileList} {
    ${desktop`
      margin-left: -60px;
      margin-right: -60px;
    `}
  }
  ${FullLengthBackground} {
    margin-bottom: 40px;

    ${mobile`
      margin-bottom: 20px;
    `}
  }
  .list {
    display: flex;
    flex-direction: column;
  }
`;
