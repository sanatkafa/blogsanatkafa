import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { desktop, mobileAndTablet, mobile, tablet } from '../../../styles/media-queries';
import Carousel from './Carousel';
import FullLengthBackground from './FullLengthBackground';
import FullLengthText from './FullLengthText';
import LargeBackgroundCategory from './LargeBackgroundCategory';
import Rectangle from './Rectangle';
import SmallBackgroundCategory from './SmallBackgroundCategory';
import TextOnly from './TextOnly';

export const LIST_TYPE_ORDER = [
  { name: 'fullLengthText', order: 0 },
  [
    { name: 'largeBackgroundCategory', order: 0 },
    { name: 'textOnly', order: 2 },
    { name: 'smallBackgroundCategory', order: 3 },
    { name: 'textOnly', order: 4 },
    { name: 'rectangle', order: 1 },
  ],
  { name: 'fullLengthBackground', order: 0 },
  { name: 'carousel', order: 0, numberOfPosts: 3 },
];

const FLATTEN_LIST_TYPE_ORDER = LIST_TYPE_ORDER.reduce((acc, val) => acc.concat(val), []);

export const LIST_TYPE = {
  carousel: Carousel,
  fullLengthBackground: FullLengthBackground,
  fullLengthText: FullLengthText,
  largeBackgroundCategory: LargeBackgroundCategory,
  rectangle: Rectangle,
  smallBackgroundCategory: SmallBackgroundCategory,
  textOnly: TextOnly,
};

class List extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        author_name: PropTypes.string,
        dek: PropTypes.string,
        displayCategory: PropTypes.shape({
          color: PropTypes.string,
          description: PropTypes.string,
          name: PropTypes.string,
          parentCategory: PropTypes.string,
          slug: PropTypes.string,
        }),
        featured_media: PropTypes.shape({}),
        slug: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    showCategoryColor: PropTypes.bool,
  };

  static defaultProps = {
    showCategoryColor: true,
  };

  getFormattedListSourceByType(posts) {
    const data = [];
    const clonedPosts = [...posts];
    const loopTimes = Math.ceil(posts.length / FLATTEN_LIST_TYPE_ORDER.length);

    Array(loopTimes)
      .fill(null)
      .forEach(() => {
        FLATTEN_LIST_TYPE_ORDER.forEach((config) => {
          const { numberOfPosts = 1 } = config;
          const numberToSlice = Math.min(numberOfPosts, clonedPosts.length);
          if (numberToSlice) {
            data.push({
              config,
              data: Array(numberToSlice)
                .fill(null)
                .map(() => clonedPosts.shift()),
            });
          }
        });
      });
    return data;
  }

  getMarkupByTemplate(data, config) {
    const { showCategoryColor } = this.props;
    const { order, name } = config;
    const Template = LIST_TYPE[name];
    if (data.length > 1) {
      return (
        <Template
          posts={data}
          order={order}
          key={data[0].slug}
          showCategoryColor={showCategoryColor}
        />
      );
    }

    return (
      <Template
        {...data[0]}
        order={order}
        key={data[0].slug}
        showCategoryColor={showCategoryColor}
      />
    );
  }

  render() {
    const { className, posts } = this.props;

    if (!posts || !posts.length) {
      return null;
    }
    const formattedPosts = this.getFormattedListSourceByType(posts);
    const templateNodes = [];

    // eslint-disable-next-line one-var
    let wrapperStartIndex, wrapperEndIndex;
    let childNodes = [];

    formattedPosts.forEach((post, i) => {
      const index = i % FLATTEN_LIST_TYPE_ORDER.length;
      const shouldAddWrapper = Array.isArray(LIST_TYPE_ORDER[index]);
      const { data, config } = post;
      if (shouldAddWrapper) {
        wrapperStartIndex = i;
        wrapperEndIndex = i + LIST_TYPE_ORDER[index].length - 1;
      }

      if (i >= wrapperStartIndex && i <= wrapperEndIndex) {
        childNodes.push(this.getMarkupByTemplate(data, config));
      } else {
        templateNodes.push(this.getMarkupByTemplate(data, config));
      }

      if (i === wrapperEndIndex) {
        templateNodes.push(
          <div key={wrapperStartIndex} className="stream-section">
            {childNodes}
          </div>
        );
        // reset
        wrapperStartIndex = undefined;
        wrapperEndIndex = undefined;
        childNodes = [];
      }
    });

    // remians
    if (childNodes.length) {
      templateNodes.push(
        <div key="final" className="stream-section">
          {childNodes}
        </div>
      );
    }

    return (
      <div className={className}>
        <div className="stream-list">{templateNodes}</div>
      </div>
    );
  }
}

const ListStyled = styled(List)`
  .stream-list {
    display: flex;
    flex-direction: column;

    > a {
      text-decoration: none;
      margin-bottom: ${({ theme }) => theme.layoutSpacing.xxl};

      ${mobile`
        margin-bottom: ${({ theme }) => theme.layoutSpacing.xl};
      `}
    }

    ${desktop`
      ${FullLengthText} {
        margin-top: 60px;
      }
    `}

    ${Carousel} {
      flex: 1 100%;

      ${mobileAndTablet`
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
      `};

      ${mobile`
        margin-right: -${({ theme }) => theme.layoutSpacing.s};
      `}

      ${tablet`
        margin-right: -${({ theme }) => theme.layoutSpacing.m};
      `}
    }
  }

  .stream-section {
    > a {
      width: 100%;
    }
    ${desktop`
      margin-top: 26px;

      > a {
        border-bottom: ${({ theme }) => theme.layoutSpacing.xxl} solid transparent;
      }

      display: flex;
      flex-flow: column wrap;
      max-height: 1400px;

      ${LargeBackgroundCategory} {
        max-width: 450px;
      }

      ${Rectangle} {
        max-width: 405px;
      }

      ${TextOnly}, ${SmallBackgroundCategory} {
        max-width: 390px;
      }

      ${LargeBackgroundCategory} {
        margin-top: 60px;
      }

      ${LargeBackgroundCategory} {
        margin-bottom: 70px; // (border-bottom-width + margin-bottom - one-line-height) = 115px
      }

      ${SmallBackgroundCategory} {
        margin-bottom: 80px; // yield for space
      }

      ${Rectangle}, ${TextOnly}, ${SmallBackgroundCategory} {
        margin-left: auto;
        margin-right: auto;
      }

      ${TextOnly} {
        margin-bottom: 26px;
      }
    `}

    ${mobileAndTablet`
      ${TextOnly} {
        margin-bottom: 70px;
      }
      ${FullLengthText} {
        margin-bottom: 85px; yield 15px for button overflow
      }
      ${LargeBackgroundCategory} {
        margin-bottom: 52px;
      }
      ${SmallBackgroundCategory} {
        margin-bottom: 106px; // yield 18px for offset rect
      }
    `}

    ${mobile`
      ${Rectangle} {
        margin-bottom: 40px;
      }
    `}

    ${tablet`
      ${Rectangle} {
        margin-bottom: 70px;
      }
    `}
  }
`;

export default ListStyled;
