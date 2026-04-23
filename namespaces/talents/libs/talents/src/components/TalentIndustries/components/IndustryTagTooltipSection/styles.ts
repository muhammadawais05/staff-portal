import { css } from 'styled-components'

export const section = css`
  width: 16.5rem;
  margin-top: 1rem;

  &:first-child {
    margin-top: 0;
  }
`

export const description = css`
  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`
