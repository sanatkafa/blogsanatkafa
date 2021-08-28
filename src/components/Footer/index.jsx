import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mobile, mobileAndTablet } from '../../styles/media-queries';

import MainLogo from '../SVGs/MainLogo';
import FacebookIcon from '../SVGs/FacebookIcon';
import PinterestIcon from '../SVGs/PinterestIcon';
import TwitterIcon from '../SVGs/TwitterIcon';
import InstagramIcon from '../SVGs/InstagramIcon';
import YouTubeIcon from '../SVGs/YouTubeIcon';
import Link from '../Link';
import LinksSection from './FooterLinksSection';
import Newsletter from './FooterNewsletter';
import { getApiUrl } from '../../lib/get-url';

const Footer = ({ className, footerData, socialUrls }) => {
  const { facebookUrl, pinterestUrl, youtubeUrl, twitterUrl, instagramUrl } = socialUrls;

  return (
    <div className={className}>
      <div className="footer-main">
        <div className="footer-title">
          <MainLogo fillColor="#fff" />
        </div>
        <div className="footer-newsletter">
          <Newsletter />
        </div>
        <div className="social-section">
          {facebookUrl ? (
            <Link className="social-icon" to={facebookUrl} title="Facebook">
              <FacebookIcon fillColor="#fff" />
            </Link>
          ) : null}
          {pinterestUrl ? (
            <Link className="social-icon" to={pinterestUrl} title="Pinterest">
              <PinterestIcon fillColor="#fff" />
            </Link>
          ) : null}
          {twitterUrl ? (
            <Link className="social-icon" to={twitterUrl} title="Twitter">
              <TwitterIcon fillColor="#fff" />
            </Link>
          ) : null}
          {instagramUrl ? (
            <Link className="social-icon" to={instagramUrl} title="Instagram">
              <InstagramIcon fillColor="#fff" />
            </Link>
          ) : null}
          {youtubeUrl ? (
            <Link className="social-icon" to={youtubeUrl} title="Youtube">
              <YouTubeIcon fillColor="#fff" />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="footer-sections">
        {footerData.items.map((item) => (
          <LinksSection key={item.id} title={item.title} links={item.subcategories} />
        ))}
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  footerData: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        subcategories: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            url: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
  socialUrls: PropTypes.shape({
    facebookUrl: PropTypes.string,
    pinterestUrl: PropTypes.string,
    youtubeUrl: PropTypes.string,
    twitterUrl: PropTypes.string,
    instagramUrl: PropTypes.string,
  }),
};

Footer.defaultProps = {
  className: null,
  socialUrls: {},
};

const FooterStyled = styled(Footer)`
  background: ${({ theme }) => theme.colors.black};
  min-height: 295px;
  display: flex;
  padding: 70px 20px;
  justify-content: space-around;
  position: relative;

  ${mobile`
    flex-direction: column;
    padding: 44px 37px;
  `};

  .footer-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .footer-title {
      color: ${({ theme }) => theme.colors.white};
      ${({ theme }) => theme.fonts.xlBold};
      display: flex;
      align-items: center;

      svg {
        width: 220px;

        ${mobileAndTablet`
          width: 180px;
        `};
      }

      ${mobile`
        ${({ theme }) => theme.fonts.l};
        letter-spacing: 5px;
      `};
    }

    .social-section {
      visibility: hidden;
    }

    ${mobile`
      .social-section {
        visibility: visible;
        width: 100%;
        max-width: 400px;
        display: flex;
        justify-content: space-around;
        padding: 24px 40px 60px;
      }

      .social-icon {
        opacity: 0.4;
      }
    `};
  }

  .footer-sections {
    display: flex;
    width: 50%;
    justify-content: space-between;

    ${mobile`
      flex-wrap: wrap;
      padding-bottom: 60px;
      width: 100%;
    `};
  }
`;

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        footerData: wordpressMenusMenusItems(name: { eq: "Footer" }) {
          items {
            order: menu_order
            title
            id: object_id
            url
            subcategories: child_items {
              id: wordpress_id
              title
              url
            }
          }
        }
        socialUrls: wordpressPage(slug: { eq: "homepage" }) {
          acf {
            facebookUrl: facebook_url
            twitterUrl: twitter_url
            instagramUrl: instagram_url
            youtubeUrl: youtube_url
            pinterestUrl: pinterest_url
          }
        }
      }
    `}
    render={(data) => {
      const apiUrl = getApiUrl();
      const formattedItems = data.footerData.items.map((item) => {
        const formattedItem = { ...item };

        if (item.subcategories) {
          formattedItem.subcategories = item.subcategories.map((subcategory) => {
            const formattedSubcategory = {
              ...subcategory,
              url: subcategory.url.replace(apiUrl, ''),
            };
            return formattedSubcategory;
          });
        } else {
          formattedItem.subcategories = [];
        }
        return formattedItem;
      });
      const formattedFooterData = { ...data.footerData, items: formattedItems };

      return (
        <FooterStyled
          footerData={formattedFooterData}
          socialUrls={data.socialUrls.acf}
          {...props}
        />
      );
    }}
  />
);
