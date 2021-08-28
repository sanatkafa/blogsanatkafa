import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';

import Provider from '../containers/Provider';
import Page from '../containers/Page';

class PageTemplate extends PureComponent {
  render() {
    const { page } = this.props.data;
    const { content, title } = page;

    return (
      <Provider>
        <Page content={content} title={title} />
      </Provider>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
      slug
      id
      content
      title
    }
  }
`;
