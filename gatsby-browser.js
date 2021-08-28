/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React, { cloneElement } from 'react';
import PropType from 'prop-types';
import { Location } from '@reach/router';
import UtmParamProvider from './src/contexts/UtmParamContext';
import startErrorReporting from './src/lib/report-errors';

export const onInitialClientRender = () => {
  startErrorReporting();
};

export const wrapRootElement = ({ element }) => {
  wrapRootElement.propTypes = {
    element: PropType.node.isRequired,
  };

  return (
    <Location>
      {({ location }) => (
        <UtmParamProvider location={location}>
          {cloneElement(element, { location })}
        </UtmParamProvider>
      )}
    </Location>
  );
};
