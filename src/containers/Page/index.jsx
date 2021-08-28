import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import { mobile, tabletAndDesktop } from '../../styles/media-queries';
import IndexLayout from '../Layout/IndexLayout';
import Layout from '../Layout';
import { clearFix } from '../../styles/theme';
import { TAXONOMIES } from '../../lib/constants';

class Page extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.node,
    title: PropTypes.string,
  };

  render() {
    const { className, content, title, location, pageSlug } = this.props;

    return (
      <Layout
        className={className}
        metatitle={title}
        ogTitle={title}
        twitterTitle={title}
        location={location}
        taxonomy={TAXONOMIES.page}
        pageType="other"
        pageSlug={pageSlug}
      >
        <IndexLayout
          center={
            <div className="page-content">
              <h1 className="page-content__title">{he.decode(title)}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          }
        />
      </Layout>
    );
  }
}

export default styled(Page)`
  .page-content {
    ${clearFix}

    .alignleft,
    .alignright {
      width: 300px;
      max-width: 100%;
      ${tabletAndDesktop`
        ${clearFix}
      `};
      ${mobile`
        margin: auto;
        padding-top: 20px;
        padding-bottom: 20px;
      `}
    }
    ${tabletAndDesktop`
      .alignleft {
        float: left;
        margin: 0.5em 1em 0.5em 0;
      }
      .alignright {
        float: right;
        margin: 0.5em 0 0.5em 1em;
      }
    `}
  }
`;
