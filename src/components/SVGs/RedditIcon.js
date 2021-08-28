import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { desktop } from '../../styles/media-queries';

class RedditIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <svg className={this.props.className} width="33px" height="33px" viewBox="0 0 33 33">
        <circle cx="16.5" cy="16.5" r="16.5" />
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <mask fill="white">
            <use xlinkHref="#reddit-circle" />
          </mask>
          <use fill="#000" xlinkHref="#reddit-circle" />
          <g fill="#FEFEFE">
            <g transform="translate(7, 9)">
              <path d="M12.1854366,9.86351286 C11.4830982,9.8700821 10.9152458,9.34707692 10.8978992,8.67757772 C10.8809513,8.02187393 11.4721319,7.45710716 12.1754673,7.45710716 C12.8683349,7.45710716 13.4524373,8.00460622 13.4575216,8.65880847 C13.4625063,9.31085226 12.8859806,9.85684978 12.1854366,9.86351286 M12.5310729,12.0693691 C12.285728,12.2526509 12.0065871,12.3882587 11.7247544,12.5137311 C10.999985,12.8365623 10.2389272,13.0190932 9.43131275,13.011304 C8.3425635,12.9900009 7.34274057,12.7006729 6.44051727,12.121923 C6.25897598,12.0054598 6.16267237,11.8434812 6.20494228,11.6355179 C6.24342384,11.4459484 6.37810934,11.3291098 6.57689754,11.2815298 C6.74069344,11.2423021 6.87687433,11.3096837 7.00478068,11.3915176 C7.8571574,11.9368582 8.79387454,12.1810462 9.82320666,12.0910476 C10.4762967,12.0338952 11.0792411,11.830155 11.6458971,11.5244978 C11.7782897,11.4530807 11.907193,11.3743437 12.0455671,11.3151268 C12.2675838,11.2202482 12.5222002,11.3001114 12.644125,11.4895869 C12.7685421,11.6830041 12.7313565,11.919872 12.5310729,12.0693691 M5.39563302,8.68151927 C5.38317137,8.01596162 5.9516219,7.4648964 6.65954319,7.45635639 C7.35649823,7.44791023 7.95106837,8.00348007 7.95086899,8.66293771 C7.9507693,9.31789073 7.3803249,9.85694363 6.6798806,9.8637944 C5.97814029,9.87073902 5.40809467,9.34595076 5.39563302,8.68151927 M18.8131391,6.71863097 C18.2999186,5.38301106 16.6980486,4.62754869 15.3548823,5.14980311 C14.9007798,5.32632792 14.5739856,5.31196944 14.143311,5.10710306 C12.9065174,4.51878088 11.5714263,4.24690828 10.1888813,4.18637744 C10.0318645,4.17952667 9.96726331,4.16404204 10.0344565,3.98836184 C10.3516802,3.15904248 10.655545,2.32521849 10.9585126,1.49120681 C10.9996859,1.37774669 11.0437503,1.34283588 11.1783361,1.3749313 C11.7906516,1.52095608 12.4059579,1.65590699 13.0212643,1.79085791 C13.1283347,1.81431947 13.1793777,1.84275489 13.1754896,1.96747656 C13.1446844,2.95990072 13.8852054,3.84430784 14.8888167,4.02834035 C15.9297132,4.21912979 16.9635315,3.68683382 17.3476493,2.76226051 C17.7274804,1.84772874 17.3010926,0.761739866 16.4185089,0.275991644 C15.4588623,-0.252175086 14.2220687,0.00158519083 13.5956964,0.833438405 C13.5107578,0.946335451 13.4386796,0.958347772 13.3076828,0.928129278 C12.4109426,0.72101059 11.5113113,0.525059608 10.6145711,0.317753228 C10.4574547,0.281434727 10.382286,0.284813192 10.3197784,0.457865688 C9.89139679,1.64473929 9.44347532,2.82541904 9.01040814,4.01097879 C8.9612594,4.14555432 8.89267049,4.18356206 8.74821507,4.19285284 C7.22520231,4.29092217 5.77735821,4.6435964 4.44067202,5.35448179 C4.3298132,5.41341724 4.24946049,5.41416801 4.14169216,5.35044641 C3.7127124,5.09640459 3.23518205,4.98125523 2.73412411,4.98895063 C1.52215409,5.00743834 0.469194691,5.78457919 0.117676528,6.89975425 C-0.230053294,8.00301084 0.212285358,9.25050912 1.18808223,9.87984211 C1.33981526,9.97762991 1.41279067,10.0863977 1.43871089,10.2531625 C1.51587342,10.7509231 1.71525978,11.2094559 1.98632555,11.639741 C2.62326529,12.650559 3.55021251,13.3652921 4.63816421,13.906785 C6.16985028,14.6690981 7.81777859,14.9811369 9.60398135,15 C10.255576,14.9879877 10.9688807,14.9373107 11.6749078,14.8081783 C13.3215401,14.5069318 14.8267078,13.9203927 16.0749662,12.8388146 C16.9309318,12.0970538 17.5270971,11.2086113 17.6872043,10.0992547 C17.7014604,10.0010915 17.7479175,9.9364314 17.8317594,9.87580672 C18.885317,9.11405666 19.2636526,7.89095841 18.8131391,6.71863097" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default styled(RedditIcon)`
  ${desktop`
    max-width: 25px;
  `};

  &:hover #Mask {
    ${({ theme }) => `
      fill: ${theme.iconHoverColors.redditOrange};
      z-index: -1;
      transition: fill ${theme.transitions.fast} linear;
    `};
  }
`;