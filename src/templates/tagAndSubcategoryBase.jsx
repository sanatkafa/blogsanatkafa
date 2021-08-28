import React, { PureComponent } from 'react';
import { get } from 'lodash';

import Provider from '../containers/Provider';

import { getNodes, getPostThumbnailFields } from '../lib/utils';

import GridPage from '../containers/GridPage';

class TagAndSubcategoryBase extends PureComponent {
  render() {
    const { filteredPosts, taxonomy } = this.props.data;
    const { humanPageNumber, numberOfPages } = this.props.pageContext;

    const formattedTaxonomy = {
      ...taxonomy,
      description: get(['acf', 'description'], ''),
      acf: undefined,
    };

    return (
      <Provider>
        <GridPage
          {...formattedTaxonomy}
          url={this.url}
          page={humanPageNumber}
          totalPages={numberOfPages}
          posts={getPostThumbnailFields(getNodes(filteredPosts))}
          taxonomy={this.taxonomy}
          parentSlug={this.parentSlug}
        />
      </Provider>
    );
  }
}

export default TagAndSubcategoryBase;
