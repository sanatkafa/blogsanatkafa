/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

const categoryTemplate = path.resolve('./src/templates/category.jsx');
const subcategoryTemplate = path.resolve('./src/templates/subcategory.jsx');
const tagTemplate = path.resolve('./src/templates/tag.jsx');
const pageTemplate = path.resolve('./src/templates/page.jsx');
const postTemplate = path.resolve('./src/templates/post.jsx');
const paginatedPostPageTemplate = path.resolve('./src/templates/paginatedPostPage.jsx');

const getSlugs = (edges) => {
  const set = new Set();
  edges.forEach((edge) => set.add(edge.node.slug));

  return [...set];
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve) => {
    resolve(
      graphql(
        `
          {
            categories: allWordpressCategory(filter: { parent_element: { id: { eq: null } } }) {
              edges {
                node {
                  id
                  path
                }
              }
            }

            subcategories: allWordpressCategory(filter: { parent_element: { id: { ne: null } } }) {
              edges {
                node {
                  id
                  path
                  slug
                }
              }
            }

            tags: allWordpressTag {
              edges {
                node {
                  id
                  path
                  slug
                }
              }
            }

            pages: allWordpressPage {
              edges {
                node {
                  id
                  slug
                }
              }
            }

            posts: allWordpressPost {
              edges {
                node {
                  id
                  path
                  slug
                }
              }
            }

            paginatedPost: allWordpressPost(sort: { fields: [date], order: DESC }) {
              edges {
                node {
                  id
                  path
                  slug
                }
              }
            }
          }
        `
      ).then((entry) => {
        const categories = entry.data.categories.edges;
        const subcategories = entry.data.subcategories.edges;
        const tags = entry.data.tags.edges;
        const pages = entry.data.pages.edges;
        const posts = entry.data.posts.edges;
        const paginatedPost = entry.data.paginatedPost.edges;

        categories.forEach((category) => {
          createPage({
            path: category.node.path,
            component: categoryTemplate,
            context: {
              id: category.node.id,
            },
          });
        });

        subcategories.forEach((subcategory) => {
          createPage({
            path: subcategory.node.path,
            component: subcategoryTemplate,
            context: {
              id: subcategory.node.id,
            },
          });
        });

        tags.forEach((tag) => {
          createPage({
            path: tag.node.path,
            component: tagTemplate,
            context: {
              id: tag.node.id,
            },
          });
        });

        pages.forEach((page) => {
          createPage({
            path: page.node.slug,
            component: pageTemplate,
            context: {
              id: page.node.id,
            },
          });
        });

        posts.forEach((post) => {
          createPage({
            path: post.node.path,
            component: postTemplate,
            context: {
              id: post.node.id,
              tag_slugs: getSlugs(tags),
              subcategory_slugs: getSlugs(subcategories),
            },
          });
        });

        paginate({
          createPage,
          items: paginatedPost,
          itemsPerPage: 10,
          itemsPerFirstPage: 26,
          pathPrefix: '/',
          component: paginatedPostPageTemplate,
        });
      })
    );
  });
};
