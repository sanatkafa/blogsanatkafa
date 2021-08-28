import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mobile } from '../../styles/media-queries';
import { Button, buttonTypes } from '../../components/Button';
import IndexLayout from '../Layout/IndexLayout';
import Layout from '../Layout';

const NotFoundPage = ({ className, location }) => {
  return (
    <Layout pageType="404" className={className} location={location}>
      <IndexLayout
        main={
          <div className="page-content">
            <h1>404</h1>
            <div className="page-not-found">Hata. Sayfa bulunamadı.</div>
            <div className="description">
              Tıkladığın bağlantı bozuk olabilir veya sayfa kaldırılmış olabilir.
            </div>
            <div className="trending-button">
              <Button
                text="Anasayfa"
                type={buttonTypes.RECTANGLE}
                url="/"
                shouldOpenNewTab={false}
              />
            </div>
          </div>
        }
      />
    </Layout>
  );
};

NotFoundPage.propTypes = {
  className: PropTypes.string,
  location: PropTypes.shape({}),
};

NotFoundPage.defaultProps = {
  className: null,
  location: {},
};

const NotFoundPageStyled = styled(NotFoundPage)`
  .page-content {
    padding: 20px 300px 190px;
    ${mobile`
      padding: 36px;
    `};

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  h1 {
    color: ${({ theme }) => theme.colors.silver};
    ${({ theme }) => theme.fonts.xxxl} ${mobile`
      ${({ theme }) => theme.fonts.xxlBold}
    `};
    line-height: 1;
    margin: 0;
    padding-bottom: 50px;
  }

  .page-not-found {
    ${({ theme }) => theme.fonts.l};
  }

  .description {
    padding: 30px 0;
  }
`;

export default NotFoundPageStyled;
