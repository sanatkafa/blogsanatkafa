import React, { useState, useRef, createRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import get from 'lodash/get';
import { KEY_ESCAPE } from 'keycode-js';

import { isDesktop } from '../../lib/utils';
import { getPostUrl } from '../../lib/get-url';
import APIService from '../../services/APIService';

import Link from '../Link';
import CloseIcon from '../SVGs/CloseIcon';
import SearchIcon from '../SVGs/SearchIcon';

import { mobileAndTablet, desktop } from '../../styles/media-queries';

const DEBOUNCE_INTERVAL = 350;
const NUM_SEARCH_RESULTS = 5;

const Search = ({ className, onSearchToggleClick }) => {
  const [results, setResults] = useState(null);
  const searchBoxRef = useRef(createRef());
  const apiService = APIService.getInstance();

  const search = debounce(() => {
    const searchTerm = get(searchBoxRef, ['current', 'value']);
    if (!searchTerm) {
      setResults(null);
      return;
    }

    apiService
      .getPosts({ search: searchTerm, per_page: NUM_SEARCH_RESULTS })
      .then((data) => setResults(data || []));
  }, DEBOUNCE_INTERVAL);

  const handleKeyUp = useCallback(() => {
    search();
  }, []);

  const handleEscape = useCallback((e) => {
    e.preventDefault();
    if (e.keyCode === KEY_ESCAPE) {
      onSearchToggleClick();
    }
  }, []);

  const markupSearchMatches = (postTitle) => {
    const searchTerm = searchBoxRef.current.value;
    const reg = new RegExp(`(${searchTerm})`, 'gi');
    return postTitle.replace(reg, '<span class="match">$1</span>');
  };

  return (
    <div
      className={className}
      tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onKeyUp={handleEscape}
    >
      <div className="close" onClick={onSearchToggleClick}>
        <CloseIcon />
      </div>
      <div className="input-wrapper">
        <SearchIcon />
        <input
          autoFocus={isDesktop()} // eslint-disable-line jsx-a11y/no-autofocus
          type="text"
          className="input-box"
          placeholder="Arama"
          ref={searchBoxRef}
          onKeyUp={handleKeyUp}
        />
      </div>
      {results !== null && (
        <div className="results">
          {results !== null &&
            !!results.length &&
            results.map((post) => (
              <div className="post" key={post.id} onClick={onSearchToggleClick}>
                <Link decorate={false} to={getPostUrl({ pathOnly: true, slug: post.slug })}>
                  <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: post.title && markupSearchMatches(post.title.rendered),
                    }}
                  />
                </Link>
              </div>
            ))}
          {results !== null && !results.length && (
            <span className="no-matches">Sonuç Bulunamadı</span>
          )}
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  onSearchToggleClick: PropTypes.func,
};

Search.defaultProps = {
  onSearchToggleClick: noop,
};

export default styled(Search)`
  height: 100%;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.search};
  .results {
    user-select: unset;
    position: relative;
    overflow-y: scroll;
    cursor: pointer;
    ${({ theme }) => theme.fonts.m};
    .post {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .match {
        font-weight: 800;
      }
    }
  }
  .no-matches {
    color: ${({ theme }) => theme.colors.darkgrey};
  }
  ${desktop`
    overflow: scroll;
    position: absolute;
    top: 0;
    position: fixed;
    background: ${({ theme }) => theme.colors.white};
    opacity: 0.75;
    .close {
      padding: 20px;
      margin: 20px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      svg {
        width: 24px;
        height: 24px;
      }
    }
    .input-wrapper {
      position: relative;
      width: 72%;
      top: 20%;
      padding-top: 94px;
      margin: 10px auto;
      .input-box {
        display: block;
        width: 100%;
        padding: 0 40px 6px;
        outline: none;
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
        text-align: center;
        line-height: normal;
        ${({ theme }) => theme.fonts.xxl}
        letter-spacing: 0px;
        caret-color: ${({ theme }) => theme.colors.cyan};
      }
      svg {
        position: absolute;
        bottom: 24px;
        left: 97%;
        width: 21px;
        height: 21px;
      }
    }
    .results {
      top: 22%;
      height: 59%;
      width: 54%;
      margin: 0 auto;
      cursor: pointer;
      padding-bottom: 12px;
      .post {
        line-height: 36px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  `}
  ${mobileAndTablet`
    position: relative;
    padding: 2px 0;

    .close {
      display: none;
    }
    .input-wrapper {
      padding: 0 30px 0 15px;
      border: solid 1px ${({ theme }) => theme.colors.grey};

      .input-box {
        height: 26px;
        display: block;
        width: 100%;
        outline: none;
        border: none;
        ${({ theme }) => theme.fonts.s}
        letter-spacing: 0px;
        padding: 2px 0;
        line-height: 16px;
      }

      svg {
        position: absolute;
        bottom: 6px;
        right: 10px;
        width: 16px;
        height: 16px;
      }
    }

    .results {
      padding: 0 15px;
      -webkit-overflow-scrolling: touch;
      margin: -1px 0 10px;
      background: ${({ theme }) => theme.colors.white};
      border: solid 1px ${({ theme }) => theme.colors.grey};
      .post {
        line-height: 36px;
      }
    }
  `}
`;
