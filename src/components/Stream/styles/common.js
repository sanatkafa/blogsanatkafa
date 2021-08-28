import { css } from 'styled-components';

/**
 * Common style shared accorss different strea component
 */

import CategoryLabel from '../../CategoryLabel';
import { mobile, tablet } from '../../../styles/media-queries';

export const streamComponentStyle = css`
  display: inline-block;

  order: ${({ order }) => order};
  ${mobile`
    flex: 1;
  `};
`;

export const topOverlayLabel = css`
  position: relative;

  ${CategoryLabel} {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const bottomOverlayLabel = css`
  position: relative;

  ${CategoryLabel} {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`;

const categoryImageSize = css`
  ${mobile`
    width: calc(100vw - ${({ theme }) => theme.layoutSpacing.s} - ${({ theme }) =>
    theme.layoutSpacing.s} - ${({ theme }) => theme.layoutSpacing.s});
    height: calc(100vw - ${({ theme }) => theme.layoutSpacing.s} - ${({ theme }) =>
    theme.layoutSpacing.s} - ${({ theme }) => theme.layoutSpacing.s});
  `};

  ${tablet`
    width: calc(100vw - ${({ theme }) => theme.layoutSpacing.m} - ${({ theme }) =>
    theme.layoutSpacing.m} - ${({ theme }) => theme.layoutSpacing.m});
    height: calc(100vw - ${({ theme }) => theme.layoutSpacing.m} - ${({ theme }) =>
    theme.layoutSpacing.m} - ${({ theme }) => theme.layoutSpacing.m});
  `};
`;

export const largeCategoryImageSize = css`
  width: 450px;
  height: 450px;

  ${categoryImageSize}
  margin-left: 50px;
  ${mobile`
    margin-left: ${({ theme }) => theme.layoutSpacing.s};
  `};

  ${tablet`
    margin-left: ${({ theme }) => theme.layoutSpacing.m};
  `};
`;

export const smallCategoryImageSize = css`
  width: 295px;
  height: 295px;

  ${categoryImageSize}
  margin-right: 38px;

  ${mobile`
    margin-right: ${({ theme }) => theme.layoutSpacing.s};
  `};

  ${tablet`
    margin-right: ${({ theme }) => theme.layoutSpacing.m};
  `};
`;

export const fullLengthContainer = css`
  ${mobile`
    margin-left: -${({ theme }) => theme.layoutSpacing.s};
    margin-right: -${({ theme }) => theme.layoutSpacing.s};
  `};

  ${tablet`
    margin-left: -${({ theme }) => theme.layoutSpacing.m};
    margin-right: -${({ theme }) => theme.layoutSpacing.m};
  `};
`;
