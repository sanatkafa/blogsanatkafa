import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import noop from 'lodash/noop';

import { mobile, tablet, desktop } from '../../styles/media-queries';
import FacebookIcon from '../SVGs/FacebookIcon';
import InstagramIcon from '../SVGs/InstagramIcon';
import Link from '../Link';
import MainLogo from '../SVGs/MainLogo';
import PinterestIcon from '../SVGs/PinterestIcon';
import TwitterIcon from '../SVGs/TwitterIcon';
import YouTubeIcon from '../SVGs/YouTubeIcon';
import SearchIcon from '../SVGs/SearchIcon';
import OverlayMenuToggler from './OverlayMenuToggler';

const Header = ({ className, onSearchToggleClick, localeData }) => {
  const { youtubeUrl, pinterestUrl, instagramUrl, twitterUrl, facebookUrl } = localeData;

  return (
    <header className={className}>
      <div className="inner-wrapper">
        <div className="header-section">
          <OverlayMenuToggler />
          <span className="search-toggle" onClick={onSearchToggleClick}>
            <SearchIcon />
          </span>
        </div>

        <div className="header-section header-section__logo">
          <Link className="header-link" to="/">
            <MainLogo />
          </Link>
        </div>

        <div className="header-section">
          <div className="external-links">
            <div className="social-section">
              {facebookUrl && (
                <Link className="social-icon" to={facebookUrl} title="Facebook">
                  <FacebookIcon />
                </Link>
              )}
              {pinterestUrl && (
                <Link className="social-icon" to={pinterestUrl} title="Pinterest">
                  <PinterestIcon />
                </Link>
              )}
              {twitterUrl && (
                <Link className="social-icon" to={twitterUrl} title="Twitter">
                  <TwitterIcon />
                </Link>
              )}
              {instagramUrl && (
                <Link className="social-icon" to={instagramUrl} title="Instagram">
                  <InstagramIcon />
                </Link>
              )}
              {youtubeUrl && (
                <Link className="social-icon" to={youtubeUrl} title="Youtube">
                  <YouTubeIcon />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const blurAnimation = keyframes`
  0% {
    filter: blur(1px);
  }
  70% {
    filter: blur(21px);
  }
  100% {
    filter: blur(0px);
  }
`;

Header.propTypes = {
  className: PropTypes.string,
  localeData: PropTypes.shape({
    youtubeUrl: PropTypes.string,
    pinterestUrl: PropTypes.string,
    instagramUrl: PropTypes.string,
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string,
  }),
  onSearchToggleClick: PropTypes.func,
};

Header.defaultProps = {
  className: null,
  localeData: {},
  onSearchToggleClick: noop,
};

export default styled(Header)`
  background: #fff;
  position: fixed;
  transition-duration: ${({ theme }) => theme.transitions.slow};
  transition-delay: -100ms;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.header};

  border-bottom: 1px solid transparent;
  height: 50px;
  display: flex;
  justify-content: center;

  ${desktop`
    .contentUnderHeader & {
      border-bottom-color: ${({ theme }) => theme.colors.lightgrey};
      transition-delay: 0ms;
    }
  `}

  ${tablet`
    .hasScrolled & {
      border-bottom-color: ${({ theme }) => theme.colors.lightgrey};
    }
  `};

  ${mobile`
    height: ${({ theme, compactHeader }) =>
      compactHeader ? theme.nav.mobileTopCompact : theme.nav.mobileTop};
    .hasScrolled & {
      border-bottom-color: ${({ theme }) => theme.colors.lightgrey};
    }
    .headerCollapsed & {
      height: auto;
    }
  `};

  .inner-wrapper {
    width: 100%;
    max-width: 1440px;
    transition-duration: ${({ theme }) => theme.transitions.slow};

    ${desktop`
      padding: ${({ compactHeader }) => (compactHeader ? '10px 42px' : '56px 42px 0')};

      .headerCollapsed & {
        padding: 10px 42px;
      }
    `}

    ${tablet`
      padding: 10px 20px;
    `}
    ${mobile`
      padding: ${({ compactHeader }) => (compactHeader ? '20px' : '24px 20px')};

      .headerCollapsed & {
        padding: 12px;
      }
    `}


    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .header-section {
    width: 33%;
    display: flex;
    justify-content: center;

    &:first-child {
      justify-content: flex-start;
    }

    &__logo svg {
      height: 100%;
      will-change: filter;
      ${desktop`
      width: 220px;
      .hasScrolled & {
          animation-name: ${({ compactHeader }) => (compactHeader ? '' : blurAnimation)};
          animation-duration: ${({ theme }) => theme.transitions.slow};
          animation-timing-function: linear;
          animation-iteration-count: 1;
        }
      `}
      ${tablet`
        width: 100%;
      `};
      ${mobile`
        margin-left: 22px;
        width: 234px;
        transition-duration: ${({ theme }) => theme.transitions.slow};
        transform-origin: center;
        transform: ${({ compactHeader }) => (compactHeader ? 'scale(.85)' : 'scale(1)')};
        .hasScrolled & {
          transform: scale(.85);
        }
      `};
    }

    &:last-child {
      justify-content: flex-end;
      padding-left: 24px;
    }
  }

  .external-links {
    transition-duration: ${({ theme }) => theme.transitions.slow};
    ${desktop`
      transform-origin: center;
      transform: ${({ compactHeader }) => (compactHeader ? 'scale(.9)' : 'scale(1)')};
      .headerCollapsed & {
        transform: scale(.9);
      }
    `}
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
  }

  .social-section {
    display: none;
    ${desktop`
      display: flex;
    `};
    padding: 0 5px;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    max-width: 200px;
    height: ${({ compactHeader }) => (compactHeader ? 'auto' : '48px')};
    .headerCollapsed & {
      height: auto;
    }
  }

  .social-icon {
    // TODO, SVG needs standardize size
    svg {
      height: 18px;
      vertical-align: middle;
    }
  }

  .header-link { display: flex; }

  .search-toggle {
    ${mobile`
      display: none;
    `};
    ${tablet`
      display: none;
    `};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.darkgrey};
    cursor: pointer;
    transform-origin: center;
    transform: ${({ compactHeader }) => (compactHeader ? 'scale(.9)' : 'scale(1)')};
    .headerCollapsed & {
      transform: scale(.9);
    }

    svg {
      height: 24px;
      width: 24px;
      margin-right: 12px;
    }
  }
`;
