import { graphql } from 'gatsby';

import TagAndSubcategoryBase from './tagAndSubcategoryBase';
import { TAXONOMIES } from '../lib/constants';
import { getTagUrl } from '../lib/get-url';

class TagTemplate extends TagAndSubcategoryBase {
  constructor(props) {
    super(props);
    this.taxonomy = TAXONOMIES.tag;
    const { taxonomy } = this.props.data;
    this.url = getTagUrl({ slug: taxonomy.slug, prentSlug: this.parentSlug });
  }
}

export default TagTemplate;

export const postTagFilterQuery = graphql`
  query currentTagQuery($id: String!) {
    taxonomy: wordpressTag(id: { eq: $id }) {
      name
      slug
      description
    }
    filteredPosts: allWordpressPost(
      filter: { tags: { elemMatch: { id: { eq: $id } } } }
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          id
          slug
          title
          date
          author {
            name
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
          categories {
            name
            slug
            wordpress_id
            acf {
              category_color
            }
          }
          acf {
            dek
          }
        }
      }
    }
  }
`;
