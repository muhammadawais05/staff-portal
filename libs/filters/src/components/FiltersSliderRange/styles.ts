import { css } from 'styled-components'

export const filterFieldContent = css`
  margin-bottom: 3px;
`

export const sliderWrapper = css`
  flex-grow: 1;
  padding: 0 0.375rem;
`

export const slider = css`
  /* It works only when a Picasso component has disablePortal: true */
  div[role='tooltip'] {
    z-index: 1000;
  }
`

export const minLabel = css`
  min-width: 3.75rem;
  margin: 0;

  span {
    font-size: 0.75rem;
  }
`

export const maxLabel = css`
  ${minLabel}
  text-align: right;
`

export const flexNoWrap = css`
  display: flex;
  flex-wrap: nowrap;
`
