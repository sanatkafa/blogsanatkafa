const get = require('lodash/get');
const unionBy = require('lodash/unionBy');

const { desktopBreakpoint } = require('../styles/media-queries');
const { IMAGE_SIZE_ALL } = require('./constants');
const { getCategoryUrl } = require('./get-url');

// Helper for redundant unpacking of the graphql payload
exports.getNodes = (data) => get(data, ['edges'], []).map((edge) => edge.node);

exports.convertToNodes = (objects) => ({
  edges: objects.map((obj) => ({
    node: obj,
  })),
});

exports.getMediaImage = (featuredMedia, type = IMAGE_SIZE_ALL) =>
  get(featuredMedia, ['localFile', 'childImageSharp', type]);

exports.getDisplayCategory = (categories, categoryLabel) => {
  const nullDisplayCategory = {
    name: null,
    color: null,
    description: null,
    slug: null,
  };
  if (!categories || !categories.length) {
    return nullDisplayCategory;
  }

  let displayCategory =
    categoryLabel && categories.find((c) => c.wordpress_id === categoryLabel.term_id);
  displayCategory = displayCategory || categories[0];
  if (!displayCategory) {
    return nullDisplayCategory;
  }

  const parentSlug = get(displayCategory, ['parent_element', 'slug']);

  return {
    name: displayCategory.name,
    color: get(displayCategory, ['acf', 'category_color'], '').toLowerCase(),
    description: get(displayCategory, ['acf', 'categoryDescription'], ''),
    parentCategory: parentSlug,
    path: getCategoryUrl({
      parentSlug,
      slug: displayCategory.slug,
      pathOnly: true,
    }),
    slug: displayCategory.slug,
    url: getCategoryUrl({
      parentSlug,
      slug: displayCategory.slug,
    }),
  };
};

function seoTitleMapping(postTitle, primaryCategory) {
  return {
    page: '',
    primary_category: primaryCategory,
    sep: '', // we already append sep and site title at the end
    sitename: '',
    title: postTitle,
  };
}

/*
 * We need to correctly format the meta title because Yoast doesn't
 * return a correctly formatted meta title. We take the response
 * (ex. '%%title%% %%page%% %%sep%% %%sitename%%') and map the keys to the correct
 * values, defined in seoTitleMapping
 */
exports.formatSEOTitle = (yoastTitle, postTitle, primaryCategory) => {
  if (!yoastTitle || yoastTitle === '') {
    return `${postTitle}`;
  }
  const mapping = seoTitleMapping(yoastTitle, primaryCategory);
  const order = yoastTitle.split('%%');

  return order.map((x) => (mapping[x] || mapping[x] === '' ? mapping[x] : x)).join(' ');
};

exports.getPostThumbnailFields = (posts = []) =>
  posts &&
  posts.map((post) => {
    const { categories, acf, slug, title, author, featured_media, id } = post;
    const { dek } = acf;
    const displayCategory = exports.getDisplayCategory(categories);

    return {
      id,
      author_name: author.name,
      dek,
      displayCategory,
      featured_media,
      slug,
      title,
    };
  });

/**
 * Return array of 3 related posts
 *
 * Ideal case:  3 recent relatedSubCategoryPosts and/or relatedTagPosts
 * Fallback: fill empty spots with relatedFallbackPosts
 *
 * @param {Array} relatedSubCategoryPosts sorted array of posts with shared subcategory(s)
 * @param {Array} relatedTagPosts sorted array of posts with shared tag(s)
 * @param {Array} relatedFallbackPosts sorted array of general recent posts
 */
exports.getRelatedPosts = (
  relatedSubCategoryPosts = [],
  relatedTagPosts = [],
  relatedFallbackPosts = []
) => {
  const idealFeatured = unionBy(relatedSubCategoryPosts, relatedTagPosts, (post) => post.id)
    .map((post) => ({
      date: new Date(post.date),
      ...post,
    }))
    .sort((post1, post2) => (post1.date >= post2.date ? -1 : 1));

  const result =
    idealFeatured.length > 2 ? idealFeatured : idealFeatured.concat(relatedFallbackPosts);
  return result.slice(0, 3);
};

exports.isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia(`(min-width: ${desktopBreakpoint}px)`).matches;

exports.isDevelopmentEnvironment = () => BUILD_ENV === 'development';

exports.isSandboxEnvironment = () => BUILD_ENV === 'sandbox';

exports.isProductionEnvironment = () => BUILD_ENV === 'production';

/**
 * Return an object with keys properties: featuredPosts, nonfeaturedPosts, and
 * nonhomepagePosts.
 * featuredPosts will be the latest four featured posts.
 * nonfeaturedPosts will be the latest 22 posts, except the latest four
 * featured posts.
 * nonhomepagePosts will be all posts that do not fit into the featuredPosts
 * and nonfeaturedPosts section.
 *
 * @param {Array} allPosts sorted array of all posts
 */
exports.splitHomepagePosts = (allPosts) => {
  const featuredPosts = [];
  const nonfeaturedPosts = [];
  const nonhomepagePosts = [];

  allPosts.edges.forEach((post) => {
    if (featuredPosts.length < 4) {
      featuredPosts.push(post);
    } else if (nonfeaturedPosts.length < 22) {
      nonfeaturedPosts.push(post);
    } else {
      nonhomepagePosts.push(post);
    }
  });

  return {
    featuredPosts,
    nonfeaturedPosts,
    nonhomepagePosts,
  };
};

exports.formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('tr', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleString('tr', {
    hour: 'numeric',
    minute: 'numeric',
  });
  return `${formattedDate} | ${formattedTime}`;
};
