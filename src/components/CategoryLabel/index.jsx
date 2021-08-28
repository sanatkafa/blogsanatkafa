import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import Link from '../Link';

class CategoryLabel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    margin: PropTypes.string,
    shouldEnableCategoryLink: PropTypes.bool,
    displayCategory: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  };

  static defaultProps = {
    shouldEnableCategoryLink: true,
  };

  render() {
    const { className, displayCategory, shouldEnableCategoryLink } = this.props;

    return (
      <div className={className}>
        {shouldEnableCategoryLink ? (
          <Link to={displayCategory.path} textColor="#fff">
            {he.decode(displayCategory.name)}
          </Link>
        ) : (
          <div>{he.decode(displayCategory.name)}</div>
        )}
      </div>
    );
  }
}

export default styled(CategoryLabel)`
  ${({ theme }) => theme.fonts.xs};
  text-transform: uppercase;
  background-color: ${({ displayCategory, theme }) => displayCategory.color || theme.colors.nude};
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  margin: ${({ margin = '0' }) => margin};
  white-space: nowrap;

  ${({ theme }) => theme.fonts.xs};
  padding: 4px 10px;
  font-weight: bold;
  line-height: normal;
`;
