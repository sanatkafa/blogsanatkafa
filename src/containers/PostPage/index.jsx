import React, { useEffect } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { mobile, tablet, mobileAndTablet } from '../../styles/media-queries';

import { LONG_FORM, SHORT_FORM, RELATED_POST } from '../../lib/constants';

import Layout from '../Layout';
import AuthorCredit from '../../components/AuthorCredit';
import CategoryLabel from '../../components/CategoryLabel';
import Link from '../../components/Link';
import PostImage from '../../components/PostImage';
import ShareIcons from '../../components/ShareIcons';
import Carousel from '../../components/Stream/components/Carousel';
import IndexLayout from '../Layout/IndexLayout';

const DEBOUNCE_INTERVAL = 350;

const PostPage = ({
  author,
  className,
  content,
  date,
  dek,
  featuredImage,
  featuredVideoID,
  displayCategory,
  pinterestImageSrc,
  postType,
  url,
  relatedPosts,
  tags,
  title,
  yoast,
  location,
  slug,
}) => {
  let currentScrollPercentage = 0;

  const handleScroll = debounce(() => {
    const { scrollHeight } = document.documentElement;
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    currentScrollPercentage = Math.ceil((scrollPosition / (scrollHeight - viewportHeight)) * 100);
  }, DEBOUNCE_INTERVAL);

  const sendToGA = debounce(() => {
    if (window.ga) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'post',
        eventAction: 'scroll',
        eventLabel: window.location.href,
        eventValue: currentScrollPercentage,
      });
    }
    // debounce to prevent double beacon
  }, 50);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    window.addEventListener('onclose', sendToGA);
    window.addEventListener('beforeunload', sendToGA);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('onclose', sendToGA);
      window.removeEventListener('beforeunload', sendToGA);
      sendToGA();
    };
  }, []);

  const { ogDescription, ogTitle, twitterDescription, twitterTitle } = yoast;

  const isLongForm = postType === LONG_FORM;
  const dekSection = dek && <div className="dek">{dek}</div>;
  const header = (
    <header className="post-header">
      <h1 className="title">{he.decode(title)}</h1>
      {!isLongForm && dekSection}
      <ShareIcons
        postUrl={url}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        pinterestImageSrc={pinterestImageSrc}
        twitterTitle={twitterTitle}
        twitterDescription={twitterDescription}
      />
      {isLongForm && dekSection}
      {author && <AuthorCredit {...author} postType={postType} date={date} />}
    </header>
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(author
      ? {
          author: {
            '@type': 'Person',
            name: author.name,
          },
        }
      : {}),
    headline: title,
    dateCreated: date,
    datePublished: date,
    dateModified: new Date().toISOString(),
    url,
    ...(tags && { keywords: tags.map((tag) => tag.name) }),
    publisher: {
      '@type': 'Organization',
      name: 'SosyoMatch',
      url: 'https://sosyomatch.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://api.sosyomatch.com/uploads/2020/05/sosyomatch.png',
      },
    },
    image: [
      get(featuredImage, ['featured_media', 'localFile', 'childImageSharp', 'fluid', 'src']),
      get(yoast, ['ogImage', 'localFile', 'childImageSharp', 'fluid', 'src']),
    ],
  };

  return (
    <Layout
      pageType="post"
      pageSlug={slug}
      className={className}
      location={location}
      {...yoast}
      compactHeader
      structuredData={structuredData}
    >
      <IndexLayout
        billboard={
          isLongForm &&
          featuredImage.featured_media && (
            <PostImage
              {...featuredImage}
              displayCategory={displayCategory}
              shouldAlignTextRight
              isLongForm
            />
          )
        }
        center={
          <article className="post-body">
            {isLongForm ? (
              header
            ) : (
              <>
                {displayCategory && (
                  <div className="category-wrapper">
                    <CategoryLabel displayCategory={displayCategory} />
                  </div>
                )}
                {header}
                {featuredVideoID ? (
                  <div className="featured-video">
                    <iframe
                      className="featured-video__iframe"
                      src={`https://www.youtube.com/embed/${featuredVideoID}?enablejsapi=1&showinfo=0&iv_load_policy=3&rel=0`}
                      title={title}
                      frameBorder="0"
                    />
                  </div>
                ) : (
                  featuredImage.featured_media && (
                    <div className="image-wrapper">
                      <PostImage {...featuredImage} />
                    </div>
                  )
                )}
              </>
            )}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
            {Array.isArray(tags) && (
              <div className="tags-list">
                Etiketler
                {': '}
                {tags.map((tag) => (
                  <Link className="tag" key={tag.slug} to={tag.url} itemProp="genre keywords">
                    {he.decode(tag.name)}
                  </Link>
                ))}
              </div>
            )}
            {relatedPosts && (
              <div className="related-posts">
                <div className="related-posts-text">İlgili Haberler</div>
                <div className="related-posts-carousel">
                  <Carousel streamItemType={RELATED_POST} posts={relatedPosts} />
                </div>
              </div>
            )}
          </article>
        }
      />
    </Layout>
  );
};

PostPage.propTypes = {
  author: PropTypes.shape({
    avatar_urls: PropTypes.shape({}),
    name: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  content: PropTypes.node,
  dek: PropTypes.string,
  date: PropTypes.string,
  featuredImage: PropTypes.shape({
    caption: PropTypes.string,
    creditName: PropTypes.string,
    creditLink: PropTypes.string,
    featured_media: PropTypes.shape({}),
  }),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  displayCategory: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    parentCategory: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({}),
  relatedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      dek: PropTypes.string,
      displayCategory: PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string,
        parentCategory: PropTypes.string,
        slug: PropTypes.string,
      }),
      featured_media: PropTypes.shape({}),
      slug: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  pinterestImageSrc: PropTypes.string,
  postType: PropTypes.oneOf([LONG_FORM, SHORT_FORM]),
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,

  /* social media props */
  yoast: PropTypes.shape({
    canonical: PropTypes.string,
    focusKeyword: PropTypes.string,
    linkdex: PropTypes.string,
    metadesc: PropTypes.string,
    metakeywords: PropTypes.string,
    metatitle: PropTypes.string,
    ogDescription: PropTypes.string,
    ogImage: PropTypes.shape({}),
    ogTitle: PropTypes.string,
    twitterDescription: PropTypes.string,
    twitterImage: PropTypes.shape({}),
    twitterTitle: PropTypes.string,
  }),
};

PostPage.defaultProps = {
  author: {},
  categories: [],
  className: null,
  content: null,
  date: '',
  dek: null,
  featuredImage: {},
  location: {},
  pinterestImageSrc: '',
  postType: SHORT_FORM,
  relatedPosts: [],
  tags: [],
  title: '',
  url: '',
  yoast: {},
};

export default styled(PostPage)`
  ${mobile`
    ${PostImage} .photo-text {
      align-item: center;
      margin-bottom: 4px;
    }
    .col-billboard {
      ${PostImage} .photo-text {
        border-bottom-width: 0;
      }
    }
  `}
  .post-body {
    max-width: 675px;
    margin: auto;
  }

  .post-header {
    display: flex;
    flex-direction: column;
    align-items: ${({ postType }) => (postType === LONG_FORM ? 'center' : 'normal')};
    text-align: ${({ postType }) => (postType === LONG_FORM ? 'center' : 'normal')};

    .dek {
      font-weight: 500;
      padding-top: ${({ postType }) => (postType === LONG_FORM ? '0' : '24px')};
      padding-bottom: ${({ postType }) => (postType === LONG_FORM ? '24px' : '0')};

      ${({ theme }) => theme.fonts.m};
      ${({ theme }) => `
        color: ${theme.colors.darkgrey};
      `};

      ${mobile`
        ${({ theme }) => theme.fonts.xs};
        line-height: 16px;
      `}
    }

    .title {
      ${({ theme }) => theme.fonts.xlBold};
      color: ${({ theme }) => theme.colors.black};
      line-height: 1;
      margin: 0;

      ${mobile`
        ${({ theme }) => theme.fonts.mlBold};
      `}
    }
  }

  .category-wrapper ${CategoryLabel} {
    ${({ postType }) => (postType === LONG_FORM ? 'margin: 20px 0;' : 'margin-bottom: 40px;')};
    ${mobile`
      ${({ postType }) => (postType === LONG_FORM ? 'margin: 20px 0;' : 'margin: 20px 0;')};
    `}
  }

  .post-content {
    line-height: 1.6;

    a {
      text-decoration: none;
      opacity: 0.8;
      ${({ theme }) => `
        border-bottom: 2px solid ${theme.colors.rose};
        transition: border-bottom ${theme.transitions.fast} linear;
        color: ${theme.colors.black};

        &:hover {
          border-bottom: 2px solid ${theme.colors.cyan};
        }
      `};
    }

    twitterwidget,
    .embed-youtube {
      display: flex !important;
      width: 100% !important;
      justify-content: center;
    }

    .giphy-embed {
      max-width: 100%;
    }
    .iframe-outer-wrapper {
      width: 100%;
    }

    .instagram-media {
      max-width: 100% !important;
      width: 100% !important;
      box-shadow: none !important;

      > div {
        letter-spacing: 0.5px;
        line-height: 0.3;
        max-width: 500px;

        border: solid 0.2px ${({ theme }) => theme.colors.lightgrey};
        border-radius: 3px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15);

        ${mobile`
          max-width: 100%;
        `} ${tablet`
          max-width: 100%;
        `};
      }
    }

    ul,
    ol {
      list-style-position: inside;
    }
  }

  .image-wrapper {
    margin: 40px 0;
    ${mobile`
      margin: 0 0 32px 0;
    `}
  }

  /* style for inline images */
  img {
    width: 100%;
    height: 100%;
  }

  .parallax-wrapper-outer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    font-size: 55px;
    line-height: 100%;
    padding: 0 80px;
    margin: 40px 0;
    border-top: solid 10px #000;
    border-bottom: solid 2px #000;
    clip-path: inset(0 0 0 0);

    ${mobile`
      padding: 0 8px;
      line-height: 2;
      height: 240px;
    `}

    .parallax-wrapper-inner {
      height: 500%;
    }

    .parallax-content {
      align-items: center;
      text-align: center;
      ${({ theme }) => theme.fonts.xlBold}

      ${mobile`
        ${({ theme }) => theme.fonts.mlBold}
        letter-spacing: 0;
      `}

      @supports (position: sticky) {
        position: sticky;
        top: 40vh;
      }
    }
  }

  .tags-list {
    display: flex;
    text-transform: uppercase;
    padding-bottom: 30px;
    flex-wrap: wrap;
    color: ${({ theme }) => theme.colors.grey};
    ${({ theme }) => theme.fonts.xs}

    .tag {
      color: ${({ theme }) => theme.colors.grey};

      &:hover {
        text-decoration: underline;
      }

      padding-left: 20px;
      ${mobile`
        padding-left: 12px;
      `};
    }

    ${mobile`
      padding: 0 18px 40px;

      .tag {
        text-decoration: underline;
      }
    `};
  }

  .related-posts {
    padding: 25px 0;
    border-top: solid 0.7px ${({ theme }) => theme.colors.lightgrey};

    .related-posts-text {
      padding: 25px 0;
      ${({ theme }) => theme.fonts.xsBold}
      text-transform: uppercase;
    }

    .related-posts-carousel {
      flex: 1 100%;

      ${mobileAndTablet`
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
      `};
    }
  }

  .featured-video {
    position: relative;
    width: 100%;
    heigh: 0;
    padding-bottom: 56.25%;
  }

  .featured-video__iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .wp-caption {
    width: 100% !important;
    padding: 16px 0;
    color: ${({ theme }) => theme.colors.grey};
    line-height: 1.3em;
    ${({ theme }) => theme.fonts.xs}

    .wp-caption-text {
      margin: 0;
    }
  }

  .post-content {
    font-family: inherit !important;
  }
`;
