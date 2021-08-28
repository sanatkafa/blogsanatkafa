import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mobile } from '../../../styles/media-queries';
import { streamComponentStyle, fullLengthContainer } from '../styles/common';
import CategoryLabel from '../../CategoryLabel';
import Link from '../../Link';
import Summary from './common/Summary';
import Title from './common/Title';
import { getPostUrl } from '../../../lib/get-url';
import { Button, buttonTypes } from '../../Button';

const FullLengthText = ({ className, title, slug, author_name, displayCategory }) => {
  return title ? (
    <Link className={className} to={getPostUrl({ pathOnly: true, slug })}>
      <div className="full-length-text__meta">
        <CategoryLabel displayCategory={displayCategory} shouldEnableCategoryLink={false} />
        <Title text={title} size="xl" />
        <Summary text={author_name} />
      </div>
      <Button text="Devamını Oku" type={buttonTypes.RECTANGLE} />
    </Link>
  ) : null;
};

FullLengthText.propTypes = {
  className: PropTypes.string,
  author_name: PropTypes.string,
  displayCategory: PropTypes.shape({
    color: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    parentCategory: PropTypes.string,
    slug: PropTypes.string,
  }),
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

FullLengthText.defaultProps = {
  className: null,
  author_name: '',
  displayCategory: {},
};

const FullLengthTextStyled = styled(FullLengthText)`
  ${streamComponentStyle}
  ${fullLengthContainer}

  background: #fff;
  box-shadow: 0 32px 87px 0 rgba(55, 84, 143, 0.09);

  padding: 50px;
  text-align: center;
  position: relative;

  ${mobile`
    padding: 36px;
    box-shadow: 0 2px 87px 0 rgba(55, 84, 143, 0.09);
  `};

  ${Summary} {
    ${({ theme }) => theme.fonts.sSemibold};
    text-transform: uppercase;
    order: 0;
  }

  ${mobile`
    .full-length-text__meta {
      display: flex;
      flex-direction: column;
    }
    ${Title} {
      order: 1;
      ${mobile`
        padding-top: 23px;
      `};
    }

    ${Summary} {
      order: 0;
      ${({ theme }) => theme.fonts.xsSemibold};
      font-weight: 600;
      text-transform: uppercase;
    }

    ${CategoryLabel} {
      display: none;
    }
  `}

  ${Button} {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
  }
`;

export default FullLengthTextStyled;
