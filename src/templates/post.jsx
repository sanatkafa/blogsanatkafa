import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import omitBy from 'lodash/omitBy';
import get from 'lodash/get';

import { getImageUrl, getPostUrl, getTagUrl } from '../lib/get-url';

import {
  formatSEOTitle,
  getNodes,
  getDisplayCategory,
  getRelatedPosts,
  getPostThumbnailFields,
  getMediaImage,
} from '../lib/utils';

import { IMAGE_SIZE_FLUID } from '../lib/constants';
import Provider from '../containers/Provider';
import PostPage from '../containers/PostPage';

class PostTemplate extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      wordpressPost: PropTypes.shape({
        author: PropTypes.shape({}),
        acf: PropTypes.shape({}),
        categories: PropTypes.arrayOf(PropTypes.shape({})),
        content: PropTypes.string,
        date: PropTypes.string,
        featured_media: PropTypes.shape({}),
        slug: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.shape({})),
        title: PropTypes.string,
        yoast: PropTypes.shape({}),
      }),
      relatedTagPosts: PropTypes.shape({}),
      relatedFallbackPosts: PropTypes.shape({}),
    }).isRequired,
  };

  pinterestImageSrc = (fallbackImage) => {
    const pinterestImageRel = get(getMediaImage(fallbackImage, IMAGE_SIZE_FLUID), ['src']);
    if (pinterestImageRel) {
      const pinterestImageSlug = pinterestImageRel.substring(1); // Remove leading '/'
      return getImageUrl({ slug: pinterestImageSlug });
    }

    return typeof fallbackImage === 'string' ? fallbackImage : '';
  };

  render() {
    const { wordpressPost, relatedTagPosts, relatedFallbackPosts } = this.props.data;

    const {
      author,
      acf,
      categories,
      content,
      date,
      featured_media,
      slug,
      tags,
      title,
      yoast,
    } = wordpressPost;

    const {
      metadesc,
      metatitle,
      ogDescription,
      ogImage,
      ogTitle,
      twitterDescription,
      twitterImage,
      twitterTitle,
    } = yoast || {};

    const { dek, post_type } = acf || {};

    const featuredImage = featured_media
      ? {
          caption: featured_media.caption,
          creditName: get(featured_media, ['acf', 'name']),
          creditLink: get(featured_media, ['acf', 'link']),
          featured_media,
        }
      : {};

    const metadata = {
      ...yoast,
      canonical: getPostUrl({ slug }),
      metadesc: metadesc || dek,
      metatitle: metatitle || title,
      ogDescription: ogDescription || dek,
      ogImage: ogImage || featured_media,
      ogTitle: ogTitle || title,
      twitterDescription: twitterDescription || dek,
      twitterImage: twitterImage || featured_media,
      twitterTitle: twitterTitle || title,
    };

    const displayCategory = getDisplayCategory(categories, categories.name);
    const filteredMetaData = omitBy(metadata, (v) => !v);
    filteredMetaData.metatitle = formatSEOTitle(metatitle, title, displayCategory.name);

    const relatedPosts = getRelatedPosts(getNodes(relatedTagPosts), getNodes(relatedFallbackPosts));

    const tagsWithUrl = () => {
      if (!tags) {
        return [];
      }
      return tags.map((tag) => {
        const url = getTagUrl({ slug: tag.slug, pathOnly: true });
        return { ...tag, url };
      });
    };

    return (
      <Provider>
        <PostPage
          author={author}
          categories={categories}
          content={content}
          date={date}
          dek={dek}
          displayCategory={displayCategory}
          featuredImage={featuredImage}
          pinterestImageSrc={this.pinterestImageSrc(featuredImage.featured_media)}
          postType={post_type}
          relatedPosts={getPostThumbnailFields(relatedPosts)}
          tags={tagsWithUrl()}
          title={title}
          url={getPostUrl({ slug })}
          slug={slug}
          yoast={filteredMetaData}
        />
      </Provider>
    );
  }
}

export default PostTemplate;

export const postQuery = graphql`
  query currentPostQuery($id: String!, $tag_slugs: [String]!) {
    relatedTagPosts: allWordpressPost(
      filter: { tags: { elemMatch: { slug: { in: $tag_slugs } } }, id: { ne: $id } }
      sort: { fields: [date], order: DESC }
      limit: 3
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
    relatedFallbackPosts: allWordpressPost(
      filter: { id: { ne: $id }, slug: { ne: "" } }
      sort: { fields: [date], order: DESC }
      limit: 3
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
    wordpressPost(id: { eq: $id }) {
      title
      content
      slug
      id
      date
      author {
        name
        avatar_urls {
          wordpress_96
        }
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
`;
