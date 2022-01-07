import React from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react'

const LoadingComponent = () => (
  <RingLoader
    color="#fd6144"
    css={css`
      position: fixed !important;
      top: calc(50% - 45px);
      left: calc(50% - 45px);
    `}
    size={90}
  />
);

export default LoadingComponent;
