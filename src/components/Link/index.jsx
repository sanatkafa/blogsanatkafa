import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { OutboundLink } from 'react-ga';

// https://next.gatsbyjs.org/docs/gatsby-link/#use-link-only-for-internal-links

const Link = ({ children, decorate, textColor, to, ...restProps }) => {
  const isRelativeLink = /^\/(?!\/)/.test(to);

  // Use gatsby-link for internal links, and <a> for others
  if (isRelativeLink) {
    return (
      <GatsbyLink to={to} {...restProps}>
        {children}
      </GatsbyLink>
    );
  }
  return (
    <OutboundLink
      eventLabel={`Go to ${to}`}
      to={to}
      target="_blank"
      rel="noopener noreferrer"
      {...restProps}
    >
      {children}
    </OutboundLink>
  );
};

Link.propTypes = {
  children: PropTypes.node,
  textColor: PropTypes.string,
  decorate: PropTypes.bool /* Should apply underline/hover style */,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  children: null,
  textColor: null,
  decorate: false,
};

export default styled(Link)`
  text-decoration: none;
  ${({ decorate, theme }) =>
    decorate &&
    `
    border-bottom: 2px solid ${theme.colors.rose};
    transition: border-bottom ${theme.transitions.fast} linear;

    &:hover {
      border-bottom: 2px solid ${theme.colors.cyan};
    }
  `};

  ${({ textColor, theme }) => `
    color: ${textColor || theme.colors.black};
  `};
`;
