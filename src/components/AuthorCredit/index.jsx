import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LONG_FORM, SHORT_FORM } from '../../lib/constants';
import { formatDate } from '../../lib/utils';

class AuthorCredit extends PureComponent {
  static propTypes = {
    avatar_urls: PropTypes.shape({}),
    className: PropTypes.string,
    date: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    postType: PropTypes.oneOf([LONG_FORM, SHORT_FORM]),
  };

  static defaultProps = {
    avatar_urls: null,
    date: null,
    url: null,
    name: null,
    postType: SHORT_FORM,
  };

  getAvatar = () => {
    const { avatar_urls, name } = this.props;

    if (avatar_urls) {
      return <img src={avatar_urls.wordpress_96} alt={name} />;
    }
    return <img src="https://www.gravatar.com/avatar" alt={name} />;
  };

  getName = () => {
    const { name } = this.props;

    if (!name) {
      return 'ANONYMOUS';
    }

    return name;
  };

  render() {
    const { className, date } = this.props;

    return (
      <div className={className}>
        <div className="author-avatar">{this.getAvatar()}</div>
        <div className="author-text">
          <div className="author" itemProp="name">
            {this.getName()}
          </div>
          <div className="date">{formatDate(date)}</div>
        </div>
      </div>
    );
  }
}

export default styled(AuthorCredit)`
  display: flex;
  padding-bottom: 20px;
  flex-direction: ${({ postType }) => (postType === LONG_FORM ? 'column' : 'row')};
  align-items: ${({ postType }) => (postType === LONG_FORM ? 'center' : 'normal')};

  .author-avatar {
    margin-right: ${({ postType }) => (postType === LONG_FORM ? '0' : '20px')};
    margin-bottom: ${({ postType }) => (postType === LONG_FORM ? '8px' : '0')};

    img {
      border-radius: 50%;
    }

    svg {
      width: 75px;
    }
  }

  .author-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${({ postType }) => (postType === LONG_FORM ? 'center' : 'normal')};
    margin-right: 8px;
    .author {
      ${({ theme }) => theme.fonts.s};
    }
  }
  .date {
    text-transform: uppercase;
    ${({ theme }) => theme.fonts.xs};
    border-bottom: solid 1px ${({ theme }) => theme.colors.lightgrey};
  }
`;
