import { css } from 'styled-components'

export const flagTitle = css`
  cursor: help;

  &:hover,
  &:focus {
    background-color: initial;
  }

  > span > span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
