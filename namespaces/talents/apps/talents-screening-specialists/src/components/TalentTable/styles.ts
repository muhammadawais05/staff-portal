import { css } from 'styled-components'

export const container = css`
  position: relative;
`

export const disabledContainer = css`
  pointer-events: none;
  opacity: 0.4;
  user-select: none;
  position: relative;
`

export const loadingIndicator = css`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 5rem;
`

export const noWrap = css`
  white-space: nowrap;
`

export const cellFirst = css`
  padding-left: 1rem;
`

// We use important here to apply this padding
// to cell, otherwise Picasso's styles override this
export const cellLast = css`
  padding-right: 1rem !important;
`
