import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import config from '../../lib/config';
import { mobileAndTablet } from '../../styles/media-queries';

import CopyLinkIcon from '../SVGs/CopyLinkIcon';
import EmailIcon from '../SVGs/EmailIcon';
import RedditIcon from '../SVGs/RedditIcon';
import PocketIcon from '../SVGs/PocketIcon';
import FlipboardIcon from '../SVGs/FlipboardIcon';
import TumblrIcon from '../SVGs/TumblrIcon';
import { OverlayMenu } from '../../contexts/OverlayMenuContext';

class ShareToolTip extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    postUrl: PropTypes.string,
    handleSharePost: PropTypes.func,
    onClickOutside: PropTypes.func,
    encodedTitle: PropTypes.string,
    encodedDescription: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { onClickOutside } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onClickOutside();
    }
  }

  handleCopyLink(url) {
    const inputTag = document.createElement('input');
    document.body.appendChild(inputTag);
    inputTag.value = url;
    inputTag.select();
    document.execCommand('copy', false);
    inputTag.remove();
  }

  render() {
    const { handleSharePost, className, postUrl, encodedTitle, encodedDescription } = this.props;

    return (
      <OverlayMenu menuID="share">
        <div className={className} ref={this.setWrapperRef}>
          <div className="share">Paylaş</div>
          <div
            className="icon"
            onClick={() =>
              handleSharePost(
                `mailto:?subject=${encodedTitle}&body=${encodedDescription} ${postUrl}`,
                true
              )
            }
            role="button"
            tabIndex="0"
          >
            <EmailIcon />
            <div className="iconTitle">E-Posta</div>
          </div>
          <div
            className="icon"
            onClick={() => this.handleCopyLink(`${postUrl}`)}
            role="button"
            tabIndex="0"
          >
            <CopyLinkIcon />
            <div className="iconTitle">Kopyala</div>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleSharePost(`${config.shareUrls.flipboardUrl}${encodedTitle}&url=${postUrl}`)
            }
            role="button"
            tabIndex="0"
            title="Flipboard'da Paylaş"
          >
            <FlipboardIcon />
            <div className="iconTitle">Flipboard</div>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleSharePost(`${config.shareUrls.redditUrl}${postUrl}&title=${encodedTitle}`)
            }
            role="button"
            tabIndex="0"
            title="Reddit'te Paylaş"
          >
            <RedditIcon />
            <div className="iconTitle">Reddit</div>
          </div>
          <div
            className="icon"
            onClick={() => handleSharePost(`${config.shareUrls.pocketUrl}${postUrl}`)}
            role="button"
            tabIndex="0"
            title="Pocket'da paylaş"
          >
            <PocketIcon />
            <div className="iconTitle">Pocket</div>
          </div>
          <div
            className="icon"
            onClick={() =>
              handleSharePost(
                `${config.shareUrls.tumblrUrl}${postUrl}&title=${encodedTitle}&caption=${encodedDescription}`
              )
            }
            role="button"
            tabIndex="0"
            title="Tumblr'da Paylaş"
          >
            <TumblrIcon />
            <div className="iconTitle">Tumblr</div>
          </div>
        </div>
      </OverlayMenu>
    );
  }
}

export default styled(ShareToolTip)`
  border-radius: 2px;
  box-shadow: 0 32px 87px 0 rgba(55, 84, 143, 0.09);
  background-color: #fff;
  border: solid 0.5px ${({ theme }) => theme.colors.lightgrey};
  position: relative;
  top: -70px;
  left: 160px;
  width: 375px;
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: -200px;
  z-index: ${({ theme }) => theme.zIndex.desktopShareToolTip};

  :before {
    position: absolute;
    left: -20px;
    top: 26px;
    content: '';
    height: 0;
    width: 0;
    border: 10px solid transparent;
    z-index: 1;
    border-right-color: ${({ theme }) => theme.colors.lightgrey};
  }
  :after {
    position: absolute;
    left: -18px;
    top: 26px;
    content: '';
    height: 0;
    width: 0;
    border: 10px solid transparent;
    z-index: 2;
    border-right-color: #ffffff;
  }

  ${mobileAndTablet`
    left: 180px;
    right: 0;
    bottom: 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    z-index: ${({ theme }) => theme.zIndex.mobileShareToolTip};
    padding: ${({ theme }) => theme.nav.mobileTopCompact} 0 30px 0;
    border: none;
    flex-wrap: nowrap;
    overflow: auto;
  `};

  .icon {
    text-align: left;
    width: 165px;
    cursor: pointer;
    padding: 10px 30px 10px 0;
    user-select: none;

    svg {
      user-select: none;
    }
  }

  .iconTitle {
    left: 4px;
    display: inline-block;
    position: relative;
    margin-left: 5px;
  }

  .share {
    display: none;

    ${mobileAndTablet`
      ${({ theme }) => theme.fonts.sBold}
      padding: 16px;
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.silver};
    `}
  }
`;
