import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { streamComponentStyle } from '../styles/common';
import { mobile } from '../../../styles/media-queries';

import CategoryLabel from '../../CategoryLabel';
import Link from '../../Link';
import Summary from './common/Summary';
import Title from './common/Title';
import { getPostUrl } from '../../../lib/get-url';

class TextOnly extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.number,
    author_name: PropTypes.string,
    displayCategory: PropTypes.shape({
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      parentCategory: PropTypes.string,
      slug: PropTypes.string,
    }),
  };

  render() {
    const { className, title, slug, author_name, displayCategory } = this.props;

    if (!title) {
      return null;
    }

    return (
      <Link className={className} to={getPostUrl({ pathOnly: true, slug })}>
        <CategoryLabel displayCategory={displayCategory} shouldEnableCategoryLink={false} />
        <Title text={title} className="LineClamp" />
        <Summary text={author_name} />
      </Link>
    );
  }
}

const TextOnlyStyled = styled(TextOnly)`
  ${streamComponentStyle}

  text-align: center;

  ${Title} {
    ${({ theme }) => theme.fonts.xlBold};
    margin-bottom: 18px;
    -webkit-line-clamp: 5;
    max-height: 276.4px;

    ${mobile`
      font-size: 35px; // make design happy
      line-height: 1.2;
      -webkit-line-clamp: 5;
      max-height: 226.0px; // (5 * 35 * 1.2) + 16
    `}
  }

  ${Summary} {
    ${({ theme }) => theme.fonts.sSemibold};
    ${mobile`
      ${({ theme }) => theme.fonts.xsSemibold};
    `};
    text-transform: uppercase;
  }
`;

export default TextOnlyStyled;
