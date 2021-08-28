import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { ForegroundCollider } from '../../contexts/CollisionContext';
import { OverlayMenuCloser } from '../../contexts/OverlayMenuContext';

import NavSubItem from './NavSubItem';
import Link from '../Link';
import VerticalCaret from '../VerticalCaret';

import { desktop, mobileAndTablet } from '../../styles/media-queries';

class NavItem extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
    isExpandedOnDesktop: PropTypes.bool,
    onClick: PropTypes.func,
    subcategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        path: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    title: PropTypes.string,
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    showBackgroundColor: PropTypes.bool,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    showBackgroundColor: false,
    isExpandedOnDesktop: false,
    onEnter: () => {},
    onLeave: () => {},
    isMobile: false,
  };

  elementRef = React.createRef();

  getNavItem() {
    const { onClick, title, path, isMobile, id, subcategories, isExpandedOnDesktop } = this.props;
    const navItem = (
      <div className="nav-item">
        <Link className="category-name" to={path}>
          {he.decode(title)}
        </Link>
        {Array.isArray(subcategories) && (
          <Caret isExpanded={isExpandedOnDesktop} onClick={onClick}>
            {' '}
            &#9660;{' '}
          </Caret>
        )}
      </div>
    );

    if (isMobile) {
      return <OverlayMenuCloser>{navItem}</OverlayMenuCloser>;
    }
    return <ForegroundCollider collisionId={`nav-item-${id}`}>{navItem}</ForegroundCollider>;
  }

  render() {
    const { className, subcategories, backgroundColor, onEnter, onLeave, isMobile } = this.props;

    return (
      <div
        ref={this.elementRef}
        className={className}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {this.getNavItem()}
        {Array.isArray(subcategories) && (
          <div className="subcategories">
            {subcategories.map((subcategory) => (
              <NavSubItem
                subcategory={subcategory}
                hoverColor={backgroundColor}
                key={subcategory.id}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const Caret = styled(VerticalCaret)`
  ${mobileAndTablet`
    display: none;
  `};
`;

export default styled(NavItem)`
  user-select: none;

  .nav-item {
    width: 100%;
    padding-top: 4px;
  }

  .category-name {
    cursor: pointer;
    text-transform: uppercase;
    padding-right: 4px;
    ${({ theme }) => theme.fonts.sBold};
    font-size: 15px;
    line-height: 1.6;
    ${({ showBackgroundColor, backgroundColor }) => {
      if (showBackgroundColor) {
        return `background: linear-gradient(to top, transparent 10%, ${backgroundColor} 10%, ${backgroundColor} 48%, transparent 48%, transparent 100%);`;
      }
      return '';
    }}
  }

  ${desktop`
    .collides {
      .category-name,
      ${Caret} {
        color: ${({ theme }) => theme.colors.white};
      }
    }

    .nav-item {
      pointer-events: auto;
      display: flex;
    }
    .subcategories {
      display: ${({ isExpandedOnDesktop }) => (isExpandedOnDesktop ? 'grid' : 'none')};
      margin-left: 20px;
      font-size: 15px;
    }
  `}

  ${mobileAndTablet`
    vertical-align: top;
    padding: 0 10px;
    display: inline-block;

    .category-name {
      background: none;
    }

    .nav-item {
      margin-top: 20px;
    }

    .subcategories {
      display: grid;
      margin-left: 0;
      line-height: 2;
    }
  `};
`;
