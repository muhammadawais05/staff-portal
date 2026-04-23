import { css } from 'styled-components'

export const unlinked = css`
  & > td:not(.actions) {
    opacity: 0.4;
  }
`
