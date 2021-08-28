import React, { PureComponent } from 'react';

import Provider from '../containers/Provider';
import NotFoundPage from '../containers/NotFoundPage';

class NotFound extends PureComponent {
  render() {
    return (
      <Provider>
        <NotFoundPage />
      </Provider>
    );
  }
}

export default NotFound;
