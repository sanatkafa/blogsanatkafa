import React, { useState, useEffect, useCallback } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { subscribe } from 'subscribe-ui-event';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { BackgroundCollider } from '../../contexts/CollisionContext';
import { IMAGE_SIZE_FLUID } from '../../lib/constants';
import { getImageUrl } from '../../lib/get-url';
import { getMediaImage } from '../../lib/utils';

import BlurWrapper from '../../components/BlurWrapper';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Search from '../../components/Search';

import { mobile, tablet, desktop } from '../../styles/media-queries';
import '../../styles/sanitize.css';
import '../../styles/reset.css';
import '../../styles/base.scss';
import '../../styles/font-faces.scss';

import favicon16 from '../../assets/favicon-16x16.png';
import favicon32 from '../../assets/favicon-32x32.png';
import safariPinnedTab from '../../assets/safari-pinned-tab.svg';
import appleTouchIcon from '../../assets/apple-touch-icon.png';

export const NAV_MAX_WIDTH = '260px';
export const LAYOUT_PADDING_DESKTOP_RIGHT = '24px';
export const LAYOUT_PADDING_MOBILE = '18px';
export const MODULE_SPACING_MOBILE = '32px';

const Layout = ({
  children,
  className,
  compactHeader,
  canonical,
  focusKeyword,
  localeData,
  location,
  metadesc,
  metakeywords,
  metatitle,
  ogDescription,
  ogImage,
  ogTitle,
  pageSlug,
  structuredData,
  twitterDescription,
  twitterImage,
  twitterTitle,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollHandler = (e, payload) => {
    const { classList } = get(document, 'documentElement', {});
    const { top, delta } = payload.scroll;
    if (classList.contains('mobile-menu-expanded')) return;
    if (top > 0) {
      classList.add('hasScrolled');
    } else {
      classList.remove('hasScrolled');
    }

    if (top >= 30) {
      classList.add('headerCollapsed');
    } else {
      classList.remove('headerCollapsed');
    }

    if (top >= 120) {
      classList.add('contentUnderHeader');
    } else {
      classList.remove('contentUnderHeader');
    }

    if (Math.abs(delta) > 5) {
      if (delta > 0) {
        // scroll down
        classList.add('scrollDown');
        classList.remove('scrollUp');
      } else {
        classList.add('scrollUp');
        classList.remove('scrollDown');
      }
    }
  };

  useEffect(() => {
    subscribe('scroll', scrollHandler, {
      enableScrollInfo: true,
      useRAF: true,
      eventOptions: {
        passive: true,
      },
    });
  }, []);

  const handleSearchToggleClick = useCallback(() => {
    setSearchOpen((prevSearchOpen) => !prevSearchOpen);
  }, []);

  const getSocialImageUrl = useCallback((image) => {
    if (!image) {
      return '';
    }

    const fluidImagePath = get(getMediaImage(image, IMAGE_SIZE_FLUID), ['src']);
    if (fluidImagePath) {
      const fluidImageSlug = fluidImagePath.substring(1); // Remove leading '/'
      return getImageUrl({ slug: fluidImageSlug });
    }
    return image.source_url;
  }, []);

  const { browserTitleSuffix } = localeData;

  return (
    <div className={className}>
      <Helmet
        title={`${he.decode(metatitle)}${browserTitleSuffix ? ` | ${browserTitleSuffix}` : ''}`}
        defaultTitle="SosyoMatch"
        meta={[
          { name: 'charset', content: 'utf-8' },
          { name: 'focuskw', content: he.decode(focusKeyword) },
          { name: 'description', content: metadesc },
          { name: 'referrer', content: 'origin' },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'copyright',
            content: `© ${new Date().getFullYear()} SosyoMatch, TÜM HAKLARI SAKLIDIR`,
          },
          { name: 'keywords', content: he.decode(metakeywords) },

          { name: 'twitter:card', content: 'summary_large_image' },
          {
            name: 'twitter:title',
            content: `${he.decode(twitterTitle)}${
              browserTitleSuffix ? ` | ${browserTitleSuffix}` : ''
            }`,
          },
          { name: 'twitter:description', content: twitterDescription },
          { name: 'twitter:site', content: '@sosyomatchcom' },
          { name: 'twitter:image', content: getSocialImageUrl(twitterImage) },

          {
            property: 'og:title',
            content: `${he.decode(ogTitle)}${browserTitleSuffix ? ` | ${browserTitleSuffix}` : ''}`,
          },
          { property: 'og:type', content: 'website' },
          { property: 'og:description', content: ogDescription },
          { property: 'og:url', content: canonical },
          { property: 'og:image', content: getSocialImageUrl(ogImage) },
          { property: 'og:site_name', content: 'SosyoMatch' },
        ]}
        link={[
          { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIcon },
          { rel: 'icon', type: 'image/png', href: favicon32, sizes: '32x32' },
          { rel: 'icon', type: 'image/png', href: favicon16, sizes: '16x16' },
          { rel: 'mask-icon', href: safariPinnedTab, color: '#000' },
          { rel: 'canonical', href: canonical },
        ]}
      >
        <html lang="tr" />
        {structuredData && (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )}
      </Helmet>
      <BlurWrapper shouldBlur={searchOpen}>
        <PageWrapper>
          <Header
            onSearchToggleClick={handleSearchToggleClick}
            compactHeader={compactHeader}
            localeData={localeData}
            pageSlug={pageSlug}
          />
          <MainContent>
            {children}
            <Nav currentPath={location.pathname} compactHeader={compactHeader} />
          </MainContent>
        </PageWrapper>
        <BackgroundCollider collisionId="footer">
          <Footer />
        </BackgroundCollider>
      </BlurWrapper>
      {searchOpen && <Search onSearchToggleClick={handleSearchToggleClick} />}
    </div>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100vw;
`;

const LayoutStyled = styled(Layout)`
  .LineClamp {
    box-orient: vertical;
    -webkit-box-orient: vertical;
  }

  .blur-wrapper {
    filter: blur(20px);
  }

  ${desktop`
    .main-logo {
      transition-duration: ${({ theme }) => theme.transitions.slow};
      transform: ${({ compactHeader }) => (compactHeader ? 'scale(.9)' : 'scale(1)')};
    }
    .headerCollapsed & {
      .main-logo {
        transform: scale(.9);
      }
    }
  `};
  main {
    position: relative;
    z-index: 1;

    ${desktop`
      padding-top: ${({ theme, compactHeader }) =>
        compactHeader ? theme.nav.mobileTopCompact : '170px;'};
      padding-left: ${({ theme }) => theme.layoutSpacing.l};
      padding-right: ${({ theme }) => theme.layoutSpacing.l};
    `};
    ${tablet`
      padding-top: ${({ theme, compactHeader }) =>
        compactHeader ? theme.nav.mobileTopCompact : '80px;'};
      padding-left: ${({ theme }) => theme.layoutSpacing.m};
      padding-right: ${({ theme }) => theme.layoutSpacing.m};
    `};
    ${mobile`
      padding-top: ${({ theme, compactHeader }) =>
        compactHeader ? theme.nav.mobileTopCompact : theme.nav.mobileTop};
      padding-left: ${({ theme }) => theme.layoutSpacing.s};
      padding-right: ${({ theme }) => theme.layoutSpacing.s};
      display: block;
    `};
    background: ${({ theme }) => theme.colors.white};
    bottom: 0;
    max-width: 1440px;
    margin: 0 auto;
    ${desktop`
      min-width: 1250px;
    `};
  }
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  compactHeader: PropTypes.bool,

  // metadata props:
  canonical: PropTypes.string,
  focusKeyword: PropTypes.string,
  localeData: PropTypes.shape({
    browserTitleSuffix: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  metadesc: PropTypes.string,
  metakeywords: PropTypes.string,
  metatitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.shape({}),
  ogTitle: PropTypes.string,
  structuredData: PropTypes.shape({}),
  twitterDescription: PropTypes.string,
  twitterImage: PropTypes.shape({}),
  twitterTitle: PropTypes.string,
};

Layout.defaultProps = {
  canonical: null,
  className: null,
  compactHeader: false,
  focusKeyword: null,
  localeData: {},
  metadesc: null,
  metakeywords: null,
  metatitle: null,
  ogDescription: null,
  ogImage: null,
  ogTitle: null,
  structuredData: {},
  twitterDescription: null,
  twitterImage: null,
  twitterTitle: null,
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        metaData: wordpressPage(slug: { eq: "homepage" }) {
          acf {
            browserTitleSuffix: browser_title_suffix
            facebookUrl: facebook_url
            twitterUrl: twitter_url
            instagramUrl: instagram_url
            youtubeUrl: youtube_url
            pinterestUrl: pinterest_url
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
    `}
    render={(data) => {
      const siteMeta = data.metaData.yoast;
      const localeData = get(data, ['metaData', 'acf']);
      // Default to site level meta data
      const newProps = { ...siteMeta, ...props };
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <LayoutStyled {...newProps} localeData={localeData} />;
    }}
  />
);
