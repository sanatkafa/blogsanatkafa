import React, { PureComponent } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { desktop, mobile } from '../../styles/media-queries';
import IndexLayout from '../Layout/IndexLayout';
import Layout from '../Layout';
import HorizontalCaret from '../../components/SVGs/HorizontalCaret';
import Link from '../../components/Link';
import TileList from '../../components/Stream/components/TileList';

class GridPage extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        featured_media: PropTypes.shape({}),
        displayCategory: PropTypes.shape({
          color: PropTypes.string,
          name: PropTypes.string,
          parentCategory: PropTypes.string,
          slug: PropTypes.string,
        }),
        title: PropTypes.string,
        dek: PropTypes.string,
        slug: PropTypes.string,
      })
    ),
  };

  static defaultProps = {
    page: null,
  };

  render() {
    const {
      className,
      description,
      name,
      totalPages,
      page,
      posts,
      location,
      taxonomy,
      url,
      parentSlug,
    } = this.props;

    const postsWithImages = posts.filter((post) => !!get(post, ['featured_media', 'localFile']));

    let metaProps = {};

    if (!page) {
      metaProps = {
        canonical: url,
        metatitle: name,
        ogTitle: name,
        twitterTitle: name,
        metadesc: description,
        ogDescription: description,
        twitterDescription: description,
      };
    }

    return (
      <Layout
        className={className}
        location={location}
        taxonomy={taxonomy}
        parentSlug={parentSlug}
        compactHeader
        {...metaProps}
      >
        <IndexLayout
          hero={
            <div className="header">
              {page ? (
                <>
                  Sayfa Sırası ({page}/{totalPages})<h1>Son Haberler</h1>
                </>
              ) : (
                <>
                  <h1>{name}</h1>
                  <h2
                    className="tag-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </>
              )}
            </div>
          }
          main={posts && <TileList posts={postsWithImages} />}
          footer={
            page && (
              <div className="page-toggles">
                <Link className="link left" to={page === 2 ? '/' : `/${page - 1}`}>
                  <HorizontalCaret direction="left" />
                  {page === 2 ? 'Anasayfa' : 'Önceki Sayfa'}
                </Link>
                {page !== totalPages && (
                  <Link className="link right" to={`/${page + 1}`}>
                    Sonraki Sayfa
                    <HorizontalCaret />
                  </Link>
                )}
              </div>
            )
          }
        />
      </Layout>
    );
  }
}

export default styled(GridPage)`
  .header {
    color: ${({ theme }) => theme.colors.darkgrey};
    ${desktop`
      margin-left: -140px;
    `};
  }

  h1 {
    color: ${({ theme }) => theme.colors.silver};
    line-height: 1;
    margin: 0;
    ${({ theme }) => theme.fonts.xxlBold}

    ${mobile`
      padding-top: 20px;
      ${({ theme }) => theme.fonts.xlBold}
    `};
  }

  ${TileList} {
    padding-bottom: 100px;
  }

  .tag-description {
    ${({ theme }) => theme.fonts.m};
    color: ${({ theme }) => theme.colors.darkgrey};
    padding: 35px 0;
    margin: 0;

    ${mobile`
      padding: 15px 0;
      ${({ theme }) => theme.fonts.sSemibold}
    `};
  }

  .link {
    display: flex;
  }

  .page-toggles {
    justify-content: space-between;
    ${({ theme }) => theme.fonts.mBold}
  }
`;
