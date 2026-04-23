import { css } from 'styled-components'

export const userBadge = css`
  margin: -1px 0;

  &,
  div {
    overflow: hidden;
  }

  div:first-child {
    overflow: initial;
  }
`
