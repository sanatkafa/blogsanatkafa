const { TAXONOMIES } = require('./constants');

const apiHostname = typeof API_HOSTNAME !== 'undefined' ? API_HOSTNAME : process.env.API_HOSTNAME;
const baseApiProtocol =
  typeof API_PROTOCOL !== 'undefined' ? API_PROTOCOL : process.env.API_PROTOCOL;
const baseBlogProtocol =
  typeof BLOG_PROTOCOL !== 'undefined' ? BLOG_PROTOCOL : process.env.BLOG_PROTOCOL;
const blogHostname =
  typeof BLOG_HOSTNAME !== 'undefined' ? BLOG_HOSTNAME : process.env.BLOG_HOSTNAME;

/**
 * Returns an SEO-friendly version of a given string.
 * @param {String} [uglyString] - The non-SEO-friendly string to be "slugified".
 * @returns {String} SEO-friendly version of uglyString.
 */
const seoify = (uglyString) => {
  if (!uglyString) {
    return '';
  }
  const uglyChars =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż/·_,:;';
  const prettierChars =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const uglyCharsRegex = new RegExp(uglyChars.split('').join('|'), 'g');

  return uglyString
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(uglyCharsRegex, (char) => prettierChars.charAt(uglyChars.indexOf(char))) // Replace special characters
    .replace(/&/g, '-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Returns the protocol of the SosyoMatch Blog's URL.
 * @param {String} [baseProtocol] - The protocol of the URL being constructred.
 * @param {String} [hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [pathOnly=false] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} the protocol of the SosyoMatch Blog's URL.
 * @example
 * // returns ''
 * getProtocol()
 * @example
 * // returns 'https://'
 * getProtocol('https')
 * @example
 * // returns ''
 * getProtocol('https', true)
 * @example
 * // returns ''
 * getProtocol('https', false, true)
 */
const getProtocol = (baseProtocol, hideProtocol = false, pathOnly = false) =>
  !baseProtocol || hideProtocol || pathOnly ? '' : `${baseProtocol}://`;

/**
 * Returns the hostname of the SosyoMatch Blog's URL.
 * @param {String} [hostname] - The hostname of the URL being constructred.
 * @param {String} [pathOnly=false] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} the hostname of the SosyoMatch Blog's URL.
 * @example
 * // returns ''
 * getHostname()
 * @example
 * // returns 'sosyomatch.com'
 * getHostname('sosyomatch.com')
 * @example
 * // returns ''
 * getHostname('sosyomatch.com', true)
 */
const getHostname = (hostname, pathOnly = false) => (!hostname || pathOnly ? '' : hostname);

/**
 * Returns the taxonomy's portion of the SosyoMatch Blog's URL.
 * @param {String} [taxonomy] - The type of resource the URL is pointing to. e.g. 'tag'.
 * @returns {String} the taxonomy's portion of the SosyoMatch Blog's URL.
 * @example
 * // returns ''
 * getTaxonomyPath()
 * @example
 * // returns ''
 * getTaxonomyPath(TAXONOMIES.page)
 * @example
 * // returns '/categorie'
 * getTaxonomyPath(TAXONOMIES.category, 'fr')
 * @example
 * // returns '/category'
 * getTaxonomyPath(TAXONOMIES.category, 'en')
 */
const getTaxonomyPath = (taxonomy) => {
  // Pages don't have an added path. For example, the homepage is just /.
  const hasTaxonomyPath =
    taxonomy === TAXONOMIES.image || taxonomy === TAXONOMIES.page || !taxonomy;

  // Get localized name of taxonomy.
  const taxonomyPath = hasTaxonomyPath ? '' : `/${seoify(taxonomy.toLowerCase())}`;

  return taxonomyPath;
};

/**
 * Returns the slug's portion of the SosyoMatch Blog's URL.
 * @param {String|String[]} slug - The unique, URL-friendly key for the resource the URL is pointing to.
 * @param {String} [taxonomy] - The type of Wordpress Element the slug belongs to.
 * @returns {String} the slug's portion of the SosyoMatch Blog's URL.
 * @example
 * // returns ''
 * getSlugPath()
 * @example
 * // returns '/hello-world'
 * getSlugPath('hello-world')
 * @example
 * // returns 'general/sub-general'
 * getSlugPath(['general', 'sub-general'])
 * @example
 * // returns '/general'
 * getSlugPath([undefined, 'general'])
 * @example
 * // returns ''
 * getSlugPath([undefined, 'homepage'], TAXONOMY.page)
 */
const getSlugPath = (slug, taxonomy) => {
  // If no slug, just return.
  if (!slug) {
    return '';
  }

  // Turn an array of slugs into a path. For example, ['Dating', 'Dating-Tips']
  // will turn into "dating/dating-tips." If it is a string already, we just
  // leave the slug as it is. The filter part will just take out undefineds.
  const slugPath = Array.isArray(slug) ? slug.filter((n) => seoify(n)).join('/') : seoify(slug);

  // The slug path is blank for the homepage. We ignore that it has a slug.
  if (!slugPath || (taxonomy === TAXONOMIES.page && slugPath === 'homepage')) {
    return '';
  }

  return `/${slugPath}`;
};

/**
 * Gets the URL for the SosyoMatch Blog.
 * @param {String} [slug] - The unique, URL-friendly key for the resource the URL is pointing to.
 * @param {String} [parentSlug] - The unique, URL-friendly key for the resource's parent the URL is pointing to.
 * @param {String} [taxonomy] - The type of resource the URL is pointing to. e.g. 'tag'.
 * @param {String} [hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for the SosyoMatch Blog
 * @example
 * // returns 'https://sosyomatch.com'
 * getBlogUrl()
 * @example
 * // returns '/hello-world'
 * getBlogUrl({ pathOnly: true, slug: 'hello-world' })
 * @example
 * // returns 'https://sosyomatch.com/fr/amour/petit-amour'
 * getBlogUrl({ parentSlug: 'amour', slug: 'petit-amour' })
 */
const assembleFullBlogUrl = (slug, parentSlug, taxonomy, pathOnly, hideProtocol) => {
  const protocol = getProtocol(baseBlogProtocol, hideProtocol, pathOnly);
  const taxonomyPath = getTaxonomyPath(taxonomy);
  // Passing in parentSlug even if it might be undefined. getSlugPath will
  // handle this.
  const slugPath = getSlugPath([parentSlug, slug], taxonomy);
  const hostname = getHostname(blogHostname, pathOnly);
  return encodeURI(protocol + hostname + taxonomyPath + slugPath);
};

/**
 * Gets the URL for the WordPress API.
 * @param {Object} [options={}] - Configurations for the URL that will be returned.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for the WordPress API
 * @example
 * // returns 'https://api.sosyomatch.com'
 * getApiUrl()
 * @example
 * // returns 'api.sosyomatch.com/fr'
 * getApiUrl({ hideProtocol: true })
 */
const getApiUrl = ({ hideProtocol } = {}) => {
  const protocol = getProtocol(baseApiProtocol, hideProtocol);
  const hostname = getHostname(apiHostname);
  return protocol + hostname;
};

/**
 * Gets the URL for the SosyoMatch Blog. Basically an alias for assembleFullBlogUrl.
 * @param {Object={}} [options] - Configurations for the URL that will be returned.
 * @param {String} [options.slug] - The unique, URL-friendly key for the resource the URL is pointing to.
 * @param {String} [options.parentSlug] - The unique, URL-friendly key for the resource's parent the URL is pointing to.
 * @param {String} [options.taxonomy] - The type of resource the URL is pointing to. e.g. 'tag'.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for the SosyoMatch Blog
 * @example
 * // returns 'https://sosyomatch.com'
 * getBlogUrl()
 * @example
 * // returns '/hello-world'
 * getBlogUrl({ pathOnly: true, slug: 'hello-world' })
 * @example
 * // returns 'https://sosyomatch.com/fr/amour/petit-amour'
 * getBlogUrl({ parentSlug: 'amour', slug: 'petit-amour' })
 */
const getBlogUrl = ({ slug, parentSlug, taxonomy, pathOnly, hideProtocol } = {}) =>
  assembleFullBlogUrl(slug, parentSlug, taxonomy, pathOnly, hideProtocol);

/**
 * Gets the URL for a category in the SosyoMatch Blog.
 * @param {Object} [options={}] - Configurations for the URL that will be returned.
 * @param {String} [options.slug] - The unique, URL-friendly key identifying the category.
 * @param {String} [options.parentSlug] - The unique, URL-friendly key identifying the category's parent.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for a category in the SosyoMatch Blog
 * @example
 * // returns '/hello-world'
 * getCategoryUrl({ pathOnly: true, slug: 'hello-world' })
 * @example
 * // returns 'https://sosyomatch.com/fr/amour/petit-amour'
 * getCategoryUrl({ parentSlug: 'amour', slug: 'petit-amour' })
 */
const getCategoryUrl = ({ slug, parentSlug, pathOnly, hideProtocol } = {}) => {
  const taxonomy = TAXONOMIES.category;
  return assembleFullBlogUrl(slug, parentSlug, taxonomy, pathOnly, hideProtocol);
};

/**
 * Gets the URL for an image in the SosyoMatch Blog.
 * @param {Object} [options={}] - Configurations for the URL that will be returned.
 * @param {String} [options.slug] - The image's filename.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for an image in the SosyoMatch Blog.
 * @example
 * // returns 'https://sosyomatch.com/brot.png'
 * getImageUrl({ slug: 'brot.png' })
 */
const getImageUrl = ({ slug, pathOnly, hideProtocol } = {}) => {
  const taxonomy = TAXONOMIES.image;
  const parentSlug = undefined;
  return assembleFullBlogUrl(slug, parentSlug, taxonomy, pathOnly, hideProtocol);
};

/**
 * Gets the URL for a page in the SosyoMatch Blog.
 * @param {Object} [options={}] - Configurations for the URL that will be returned.
 * @param {String} [options.slug] - The unique, URL-friendly key identifying the page.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for a page in the SosyoMatch Blog.
 * @example
 * // returns '/2'
 * getPageUrl({ pathOnly: true, slug: '2' })
 * @example
 * // returns 'https://sosyomatch.com/about-the-team'
 * getPageUrl({ slug: 'about-the-team' })
 */
const getPageUrl = ({ slug, pathOnly, hideProtocol } = {}) => {
  const taxonomy = TAXONOMIES.page;
  const parentSlug = undefined;
  return assembleFullBlogUrl(slug, parentSlug, taxonomy, pathOnly, hideProtocol);
};

/**
 * Gets the URL for a post in the SosyoMatch Blog.
 * @param {Object} [options={}] - Configurations for the URL that will be returned.
 * @param {String} [options.slug] - The unique, URL-friendly key identifying the post.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for a post in the SosyoMatch Blog.
 * @example
 * // returns 'sosyomatch.com/post/moved-to-la'
 * getPostUrl({ hideProtocol: true, slug: 'moved-to-la' })
 * @example
 * // returns 'https://sosyomatch.com/post/moved-to-la'
 * getPostUrl({ slug: 'moved-to-la' })
 */
const getPostUrl = ({ slug, pathOnly, hideProtocol } = {}) => {
  const taxonomy = TAXONOMIES.post;
  const parentSlug = undefined;
  return assembleFullBlogUrl(slug, parentSlug, taxonomy, pathOnly, hideProtocol);
};

/**
 * Gets the URL for a tag in the SosyoMatch Blog.
 * @param {Object} [options={}] - Configurations for the URL that will be returned.
 * @param {String} [options.slug] - The unique, URL-friendly key identifying the tag.
 * @param {String} [options.hideProtocol] - If true, does not include the protocol in the URL that is returned.
 * @param {String} [options.pathOnly] - If true, the complete URL won't include protocol, hostname if true.
 * @returns {String} URL for a tag in the SosyoMatch Blog.
 * @example
 * // returns 'sosyomatch.com/post/moved-to-la'
 * getPostUrl({ hideProtocol: true, slug: 'moved-to-la' })
 * @example
 * // returns 'https://sosyomatch.com/post/moved-to-la'
 * getPostUrl({ slug: 'moved-to-la' })
 */
const getTagUrl = ({ slug, pathOnly, hideProtocol } = {}) => {
  const taxonomy = TAXONOMIES.tag;
  const parentSlug = undefined;
  return assembleFullBlogUrl(slug, parentSlug, taxonomy, pathOnly, hideProtocol);
};

module.exports = {
  getApiUrl,
  getBlogUrl,
  getCategoryUrl,
  getImageUrl,
  getPageUrl,
  getPostUrl,
  getTagUrl,
};
