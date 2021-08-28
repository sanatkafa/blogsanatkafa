import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import styled, { css } from 'styled-components';
import { mobile } from '../../styles/media-queries';

export const buttonTypes = {
  FLOORED: 'Floored',
  ROUNDED_LARGE: 'Rounded large',
  RECTANGLE: 'Rectangle',
  ROUNDED: 'Rounded',
};

const Button = ({ className, icon, onClick, shouldOpenNewTab, text, url }) => {
  const button = (
    <button className={className} onClick={onClick} type="button">
      {icon ? <span className="icon">{icon}</span> : null}
      <span className="button-text">{text}</span>
    </button>
  );

  if (url) {
    return (
      <LinkedButtonWrapper
        href={url}
        target={shouldOpenNewTab ? '_blank' : '_self'}
        rel={shouldOpenNewTab ? 'noopener noreferrer' : null}
      >
        {button}
      </LinkedButtonWrapper>
    );
  }
  return button;
};

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  shouldOpenNewTab: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  icon: null,
  onClick: noop,
  shouldOpenNewTab: true,
  type: buttonTypes.ROUNDED,
  url: null,
};

const LinkedButtonWrapper = styled.a`
  text-decoration: none;
`;

export default styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.gradients.pink};

  ${({ type, theme }) => {
    if (type === buttonTypes.FLOORED) {
      return css`
        padding: 0 10px;
        min-width: 140px;
        height: 30px;
        border-radius: ${theme.borderRadii.s} ${theme.borderRadii.s} 0 0;
        ${theme.fonts.xs}
      `;
    }
    if (type === buttonTypes.ROUNDED_LARGE) {
      return css`
        min-width: 245px;
        padding: 0 24px;
        height: 60px;
        border-radius: ${theme.borderRadii.m};
        ${theme.fonts.mBold}

        ${mobile`
          min-width: 200px;
          padding: 0 16px;
          height: 50px;
          ${theme.fonts.sBold}
        `};
      `;
    }
    if (type === buttonTypes.RECTANGLE) {
      return css`
        padding: 0 20px;
        min-width: 120px;
        height: 35px;
        ${theme.fonts.s}

        ${mobile`
          min-width: 95px;
          height: 30px;
          padding: 0 10px;
          ${theme.fonts.xsSemibold}
        `};
      `;
    }
    if (type === buttonTypes.ROUNDED) {
      return css`
        border-radius: ${theme.borderRadii.m};
        min-width: 115px;
        height: 30px;
        padding: 0 10px;
        ${theme.fonts.xs}
      `;
    }
  }};

  text-transform: uppercase;
  outline: none;
  border: none;
  white-space: nowrap;
  cursor: pointer;

  .icon {
    margin-right: 10px;
  }
`;
