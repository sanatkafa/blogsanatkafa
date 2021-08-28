import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { TAXONOMIES } from '../lib/constants';
import { getPostThumbnailFields, getNodes, splitHomepagePosts } from '../lib/utils';

import HomePage from '../containers/HomePage';
import Provider from '../containers/Provider';

class HomeTemplate extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      allPosts: PropTypes.shape({}),
    }).isRequired,
  };

  render() {
    const { allPosts } = this.props.data;
    const { location } = this.props;
    const homepagePosts = splitHomepagePosts(allPosts);
    const featuredPosts = getNodes({ edges: homepagePosts.featuredPosts });
    const nonfeaturedPosts = getNodes({ edges: homepagePosts.nonfeaturedPosts });
    // 4 Featured Posts + 22 Nonfeatured Posts = 26. 27 to know if there is
    // paginated posts.
    const hasPaginatedPosts = allPosts.edges.length >= 27;

    return (
      <Provider>
        <HomePage
          location={location}
          featuredPosts={getPostThumbnailFields(featuredPosts)}
          latestPosts={getPostThumbnailFields(nonfeaturedPosts)}
          taxonomy={TAXONOMIES.page}
          hasPaginatedPosts={hasPaginatedPosts}
        />
      </Provider>
    );
  }
}

export default HomeTemplate;

export const pageQuery = graphql`
  query homepageQuery {
    allPosts: allWordpressPost(sort: { fields: [date], order: DESC }, limit: 27) {
      edges {
        node {
          id
          slug
          title
          date
          author {
            name
          }
          categories {
            name
            slug
            wordpress_id
            acf {
              category_color
            }
          }
          tags {
            name
            slug
          }
          featured_media {
            id
            caption
            localFile {
              childImageSharp {
                fluid(maxWidth: 1024) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          acf {
            dek
            post_type
          }
        }
      }
    }
    homepage: wordpressPage(slug: { eq: "homepage" }) {
      slug
    }
  }
`;
