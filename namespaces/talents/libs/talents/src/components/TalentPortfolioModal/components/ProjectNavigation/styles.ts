import { css } from 'styled-components'

import { NAVIGATION_HEIGHT } from './constants'

// prettier-ignore
export const navigationOverlay = css`
  width: 100%;
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  min-height: ${NAVIGATION_HEIGHT}rem;
  background: linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, white 40px);
`
export const navigationContainer = css`
  width: 100%;
  align-self: flex-end;
`

export const previousButton = css`
  align-self: flex-start;
  width: 100%;
`

export const nextButton = css`
  align-self: flex-end;
  width: 100%;
`
