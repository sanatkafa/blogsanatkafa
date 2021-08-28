import { graphql } from 'gatsby';

import TagAndSubcategoryBase from './tagAndSubcategoryBase';
import { TAXONOMIES } from '../lib/constants';
import { getCategoryUrl } from '../lib/get-url';

class SubcategoryTemplate extends TagAndSubcategoryBase {
  constructor(props) {
    super(props);
    const { parentElement, slug } = this.props.data.taxonomy;
    this.taxonomy = TAXONOMIES.category;
    this.parentSlug = parentElement.slug;
    this.url = getCategoryUrl({ slug, prentSlug: this.parentSlug });
  }
}

export default SubcategoryTemplate;

export const postSubCategoryFilterQuery = graphql`
  query currentSubcategoryQuery($id: String!) {
    taxonomy: wordpressCategory(id: { eq: $id }) {
      name
      slug
      acf {
        description: category_description
      }
      parentElement: parent_element {
        slug
      }
    }

    filteredPosts: allWordpressPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
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
