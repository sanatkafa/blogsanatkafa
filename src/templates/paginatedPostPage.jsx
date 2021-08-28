import { graphql } from 'gatsby';

import TagAndSubcategoryBase from './tagAndSubcategoryBase';
import { TAXONOMIES } from '../lib/constants';
import { getPageUrl } from '../lib/get-url';

class PaginatedPostPage extends TagAndSubcategoryBase {
  constructor(props) {
    super(props);
    this.taxonomy = TAXONOMIES.page;
    this.url = getPageUrl({ slug: this.props.pageContext.numberOfPages });
  }
}

export default PaginatedPostPage;

export const PaginatedPostPageQuery = graphql`
  query paginatedPostsQuery($skip: Int!, $limit: Int!) {
    filteredPosts: allWordpressPost(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          content
          slug
          id
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
            parent_element {
              slug
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
                fixed(cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed_withWebp
                }
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            source_url
          }
          acf {
            dek
            post_type
          }
          yoast {
            focusKeyword: focuskw
            metatitle: title
            metadesc
            metakeywords
            meta_robots_noindex
            meta_robots_nofollow
            meta_robots_adv
            canonical
            ogTitle: opengraph_title
            ogDescription: opengraph_description
            ogImage: opengraph_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            twitterTitle: twitter_title
            twitterDescription: twitter_description
            twitterImage: twitter_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
