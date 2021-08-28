import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';

import { getNodes, getDisplayCategory, getPostThumbnailFields } from '../lib/utils';

import Provider from '../containers/Provider';
import CategoryPage from '../containers/CategoryPage';

class CategoryTemplate extends PureComponent {
  render() {
    const { filteredPosts, allCategories, category } = this.props.data;
    const posts = getPostThumbnailFields(getNodes(filteredPosts));

    return (
      <Provider>
        <CategoryPage
          displayCategory={getDisplayCategory(getNodes(allCategories), category)}
          posts={posts}
        />
      </Provider>
    );
  }
}

export default CategoryTemplate;

export const postCategoryFilterQuery = graphql`
  query currentCategoryQuery($id: String!) {
    allCategories: allWordpressCategory {
      edges {
        node {
          name
          slug
          description
          wordpress_id
          acf {
            category_color
            categoryDescription: category_description
          }
        }
      }
    }
    category: wordpressCategory(id: { eq: $id }) {
      term_id: wordpress_id
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
            description
          }
          acf {
            dek
          }
          author {
            name
          }
        }
      }
    }
  }
`;
