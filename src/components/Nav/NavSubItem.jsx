import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { ForegroundCollider } from '../../contexts/CollisionContext';
import { OverlayMenuCloser } from '../../contexts/OverlayMenuContext';

import Link from '../Link';

const SubcategoryName = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    color: ${({ color }) => color};
  }
`;

const NavSubItemStyled = styled.div`
  .collides .subcategory-name {
    color: ${({ theme }) => theme.colors.white};
  }
`;

class NavSubItem extends PureComponent {
  static propTypes = {
    subcategory: PropTypes.shape({
      id: PropTypes.number,
      path: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    hoverColor: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    hoverColor: undefined,
    isMobile: false,
  };

  getNavSubItem() {
    const { subcategory, isMobile } = this.props;
    const navSubItem = (
      <SubcategoryName
        className="subcategory-name"
        to={subcategory.path}
        color={this.props.hoverColor}
      >
        {he.decode(subcategory.title)}
      </SubcategoryName>
    );
    if (isMobile) {
      return <OverlayMenuCloser>{navSubItem}</OverlayMenuCloser>;
    }
    return (
      <ForegroundCollider collisionId={`nav-subitem-${subcategory.id}`}>
        {navSubItem}
      </ForegroundCollider>
    );
  }

  render() {
    return <NavSubItemStyled>{this.getNavSubItem()}</NavSubItemStyled>;
  }
}

export default NavSubItem;
