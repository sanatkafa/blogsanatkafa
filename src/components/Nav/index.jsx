import React, { PureComponent } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OverlayMenu } from '../../contexts/OverlayMenuContext';
import { getApiUrl, getCategoryUrl } from '../../lib/get-url';
import { getNodes } from '../../lib/utils';

import NavItem from './NavItem';
import Search from '../Search';

import { tablet, desktop, mobileAndTablet } from '../../styles/media-queries';

class Nav extends PureComponent {
  static propTypes = {
    currentPath: PropTypes.string,
    categoryData: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.number,
            acf: PropTypes.shape({
              category_color: PropTypes.string,
            }),
          }),
        })
      ),
    }),
    menuData: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          path: PropTypes.string,
          subcategories: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              path: PropTypes.string,
            })
          ),
        })
      ),
    }),
    className: PropTypes.string,
    compactHeader: PropTypes.bool,
  };

  static defaultProps = {
    currentPath: '',
    compactHeader: false,
  };

  colorMap = {};

  constructor(props) {
    super(props);
    this.state = {
      expandedCategories: this.initialExpandedCategories(),
      hoveredCategory: undefined,
    };
    this.colorMap = getNodes(props.categoryData).reduce((map, post) => {
      // eslint-disable-next-line no-param-reassign
      map[post.id] = post.acf ? post.acf.category_color : null;
      return map;
    }, {});
  }

  getBackgroundFromCategoryId(categoryId) {
    return this.colorMap[categoryId] ? this.colorMap[categoryId].toLowerCase() : null;
  }

  getDesktopNavItems = () => {
    const { menuData, className } = this.props;
    return (
      <DesktopNavContainer>
        <nav className={className}>
          {menuData.items.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              isExpandedOnDesktop={this.state.expandedCategories[item.id]}
              backgroundColor={this.getBackgroundFromCategoryId(item.id)}
              path={item.path}
              title={item.title}
              onClick={() => this.handleClickCategoryDropdown(item.id)}
              onEnter={() => this.handleMouseOverCategory(item)}
              onLeave={() => this.handleMouseLeaveCategory(item)}
              subcategories={item.subcategories}
              showBackgroundColor={this.showBackgroundColor(item)}
              isMobile={false}
            />
          ))}
        </nav>
      </DesktopNavContainer>
    );
  };

  getMobileNavItem(navItem) {
    return (
      <NavItem
        key={navItem.id}
        id={navItem.id}
        path={navItem.path}
        title={navItem.title}
        subcategories={navItem.subcategories}
        isMobile
      />
    );
  }

  showBackgroundColor = (navItem) => {
    const isHovered = this.state.hoveredCategory === navItem.id;
    const isDisabledForHover = this.state.hoveredCategory && !isHovered;
    const isCurrentCategoryPage = this.props.currentPath.includes(navItem.path);
    return (isCurrentCategoryPage && !isDisabledForHover) || isHovered;
  };

  getMobileNavItems = () => {
    const { className, compactHeader } = this.props;
    const navItems = this.props.menuData.items;
    const halfWayIndex = Math.floor(navItems.length / 2);
    const leftNavItems = navItems.slice(0, halfWayIndex);
    const rightNavItems = navItems.slice(halfWayIndex);

    return (
      <OverlayMenu menuID="nav">
        <MobileNavContainer className={className}>
          <SearchContainer compactHeader={compactHeader}>
            <Search />
          </SearchContainer>
          <MobileNav compactHeader={compactHeader}>
            <MobileMenuColumn>
              {leftNavItems.map((navItem) => this.getMobileNavItem(navItem))}
            </MobileMenuColumn>
            <MobileMenuColumn>
              {rightNavItems.map((navItem) => this.getMobileNavItem(navItem))}
            </MobileMenuColumn>
          </MobileNav>
        </MobileNavContainer>
      </OverlayMenu>
    );
  };

  handleMouseOverCategory(categoryHovered) {
    this.setState({ hoveredCategory: categoryHovered.id });
  }

  handleMouseLeaveCategory() {
    this.setState({ hoveredCategory: undefined });
  }

  handleClickCategoryDropdown(categoryClicked) {
    this.setState((prevState) => ({
      expandedCategories: {
        ...prevState.expandedCategories,
        [categoryClicked]: !prevState.expandedCategories[categoryClicked],
      },
    }));
  }

  initialExpandedCategories() {
    const categoryExpandedByDefault = this.props.menuData.items.find((item) =>
      this.props.currentPath.includes(item.path)
    );
    if (categoryExpandedByDefault) {
      return { [categoryExpandedByDefault.id]: true };
    }
    return {};
  }

  render() {
    return (
      <>
        {this.getDesktopNavItems()}
        {this.getMobileNavItems()}
      </>
    );
  }
}

const MobileNav = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

const MobileNavContainer = styled.nav`
  background-color: #fff;
  ${desktop`
    display: none;
  `}
`;

const DesktopNavContainer = styled.nav`
  position: absolute;
  color: ${({ theme }) => theme.colors.black};
  max-width: ${({ theme }) => theme.nav.width};
  padding: 54px 40px 0 12px;
  z-index: ${({ theme }) => theme.zIndex.nav};
  @supports (position: sticky) {
    position: sticky;
    height: 50vh;
    margin-top: -50vh;
    bottom: ${({ theme }) => theme.nav.bottom};
  }
  ${mobileAndTablet`
    display: none;
  `}
`;

const MobileMenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const SearchContainer = styled.div`
  ${desktop`
    display: none;
  `}

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  margin: auto;
`;

const NavStyled = styled(Nav)`
  top: ${({ theme, compactHeader }) =>
    compactHeader ? theme.nav.mobileTopCompact : theme.nav.mobileTop};
  ${mobileAndTablet`
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.mobileNav};
    width: 100vw;
    height: 100vh;
    padding: 30px 10px 10px 10px;
    .headerCollapsed & {
      top: ${({ theme }) => theme.nav.mobileTopCompact}
    }
    left: 0;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  `}

  ${tablet`
    top: ${({ theme }) => theme.nav.mobileTopCompact};
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  `}
`;

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        menuData: wordpressMenusMenusItems(name: { eq: "Nav Menu" }) {
          items {
            order: menu_order
            title
            id: object_id
            url
            subcategories: child_items {
              order: menu_order
              title
              id: wordpress_id
              url
            }
          }
        }
        categoryData: allWordpressCategory {
          edges {
            node {
              id: wordpress_id
              acf {
                category_color
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const apiUrl = getApiUrl();
      const formattedItems = data.menuData.items.map((item) => {
        let slug = item.url.replace(`${apiUrl}/kategori/`, '');
        const categoryPath = getCategoryUrl({ slug, pathOnly: true });
        const formattedItem = { ...item, path: categoryPath };

        if (formattedItem.subcategories) {
          formattedItem.subcategories = item.subcategories.map((subcategory) => {
            slug = subcategory.url.replace(`${apiUrl}/kategori/`, '');
            const subcategoryPath = getCategoryUrl({ slug, pathOnly: true });
            const formattedSubcategory = { ...subcategory, path: subcategoryPath };
            return formattedSubcategory;
          });
        }

        return formattedItem;
      });
      const formattedMenuData = { ...data.menuData, items: formattedItems };
      return <NavStyled menuData={formattedMenuData} categoryData={data.categoryData} {...props} />;
    }}
  />
);
