import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { desktop } from '../../styles/media-queries';

import config from '../../lib/config';
import FacebookIcon from '../SVGs/FacebookShareIcon';
import TwitterIcon from '../SVGs/TwitterShareIcon';
import PinterestIcon from '../SVGs/PinterestShareIcon';
import ShareIcon from '../SVGs/ShareIcon';
import ShareToolTip from './ShareToolTip';
import { OverlayMenuExpander } from '../../contexts/OverlayMenuContext';

class ShareIcons extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    ogDescription: PropTypes.string,
    ogTitle: PropTypes.string,
    twitterTitle: PropTypes.string,
    twitterDescription: PropTypes.string,
    pinterestImageSrc: PropTypes.string,
    postUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showShareToolTip: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleSharePost(url, clearWindow) {
    // Height and width specified by https://dev.twitter.com/web/intents
    const width = 550;
    const height = 520;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const shareWindow = window.open(
      url,
      'intent',
      `width=${width},height=${height},personalbar=0,toolbar=0,location=1,scrollbars=1,resizable=1,left=${left},top=${top}`
    );

    if (clearWindow) {
      setTimeout(() => {
        shareWindow.close();
      }, 500);
    }
  }

  handleClickOutside() {
    this.setState({
      showShareToolTip: false,
    });
  }

  handleClickShare() {
    this.setState({
      showShareToolTip: true,
    });
  }

  encodeTitle(title) {
    return title && encodeURIComponent(`${title}: `);
  }

  encodeDescription(description) {
    return description && encodeURIComponent(description);
  }

  encodeTitleAndDescription(title, description) {
    const encodedTitle = this.encodeTitle(title);
    const encodedDescription = this.encodeDescription(description);
    return `${encodedTitle}${encodedDescription}`;
  }

  render() {
    const {
      className,
      ogDescription,
      ogTitle,
      pinterestImageSrc,
      twitterDescription,
      twitterTitle,
      postUrl,
    } = this.props;

    const formatTwitterText = this.encodeTitleAndDescription(twitterTitle, twitterDescription);
    const formatOgText = this.encodeTitleAndDescription(ogTitle, ogDescription);

    return (
      <div className={className}>
        <div className="shareIcons">
          <span
            onClick={() => this.handleSharePost(`${config.shareUrls.facebookUrl}${postUrl}`)}
            role="button"
            tabIndex="0"
            title="Facebook'da Paylaş"
          >
            <FacebookIcon />
          </span>
          <span
            onClick={() =>
              this.handleSharePost(
                `${config.shareUrls.pinterestUrl}${postUrl}/&media=${pinterestImageSrc}&description=${formatOgText}`
              )
            }
            role="button"
            tabIndex="0"
            title="Pinterest'de Paylaş"
          >
            <PinterestIcon />
          </span>
          <span
            onClick={() =>
              this.handleSharePost(
                `${config.shareUrls.twitterUrl}${postUrl}&text=${formatTwitterText}`
              )
            }
            role="button"
            tabIndex="0"
            title="Twitter'da Paylaş"
          >
            <TwitterIcon />
          </span>
          <span
            onClick={() => this.handleClickShare()}
            role="button"
            tabIndex="0"
            title="Diğer Platformlar"
          >
            <OverlayMenuExpander menuID="share">
              <ShareIcon />
            </OverlayMenuExpander>
          </span>
        </div>
        {this.state.showShareToolTip && (
          <ShareToolTip
            handleSharePost={this.handleSharePost}
            postUrl={postUrl}
            encodedTitle={this.encodeTitle(ogTitle)}
            encodedDescription={this.encodeDescription(ogDescription)}
            onClickOutside={this.handleClickOutside}
          />
        )}
      </div>
    );
  }
}

export default styled(ShareIcons)`
  width: 160px;

  ${desktop`
    width: 130px; // mobile icons are larger
  `};

  .shareIcons {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    span {
      cursor: pointer;
    }

    svg {
      width: 33px;
      user-select: none;

      ${desktop`
        width: 25px;
      `};
    }
  }
`;
