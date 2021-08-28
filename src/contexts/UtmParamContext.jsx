import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import querystring from 'querystring';

export const UtmParamContext = React.createContext({
  utmMedium: null,
  utmCampaign: null,
  utmSource: null,
});

const UtmParamProvider = ({ children, location }) => {
  const [utmSource, setUtmSource] = useState();
  const [utmCampaign, setUtmCampaign] = useState();
  const [utmMedium, setUtmMedium] = useState();

  useEffect(() => {
    const urlPath = location.search.replace(/^\?/, '');
    const urlParams = querystring.parse(urlPath);
    setUtmSource(urlParams.utm_source);
    setUtmCampaign(urlParams.utm_campaign);
    setUtmMedium(urlParams.utm_medium);
  }, []);

  const providerValue = useMemo(
    () => ({
      utmMedium,
      utmCampaign,
      utmSource,
    }),
    []
  );

  return <UtmParamContext.Provider value={providerValue}>{children}</UtmParamContext.Provider>;
};

UtmParamProvider.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({}),
};

UtmParamProvider.defaultProps = {
  location: {},
};

export default UtmParamProvider;
