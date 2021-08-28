import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { useToasts } from 'react-toast-notifications';

const FooterNewsletter = ({ className }) => {
  const [email, setEmail] = useState('');
  const { addToast } = useToasts();

  const handleSumbit = (e) => {
    e.preventDefault();

    addToMailchimp(email)
      .then(() => {
        addToast('Bültene kaydolduğunuz için çok teşekkür ederiz.', { appearance: 'success' });
      })
      .catch(() => {
        addToast('Bir sorun oluştu lütfen daha sonra tekrar deneyiniz.', { appearance: 'error' });
      });
  };

  return (
    <div className={className}>
      <form onSubmit={handleSumbit}>
        <input
          type="email"
          placeholder="E-Posta"
          name="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="footer-newsletter-button">
          <button type="submit">Abone Ol</button>
        </div>
      </form>
    </div>
  );
};

FooterNewsletter.propTypes = {
  className: PropTypes.string,
};

export default styled(FooterNewsletter)`
  form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    margin-top: 60px;

    > input {
      position: relative;
      flex: 1 1 auto;
      width: 1%;
      margin-bottom: 0;
      display: block;
      height: 44px;
      padding: 0px 20px 0px 10px;
      background-color: #000;
      color: #7a7c81;
      font-size: 18px;
      border-radius: 0;
      border: 1px solid #7a7c81;

      &:focus {
        outline: none;
      }
    }
  }

  .footer-newsletter-button {
    margin-left: -1px;
    display: flex;

    > button {
      z-index: 1;
      color: #fff;
      min-width: 120px;
      height: 44px;
      font-family: $font-family;
      font-size: 16px;
      font-weight: 400;
      text-transform: uppercase;
      white-space: nowrap;
      cursor: pointer;
      background: linear-gradient(260deg, #ff7854, #fd267d);
      padding: 0px 20px;
      outline: none;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
    }
  }
`;
