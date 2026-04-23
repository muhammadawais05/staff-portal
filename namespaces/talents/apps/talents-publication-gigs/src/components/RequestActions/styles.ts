import { css } from 'styled-components'

export const dropdown = css`
  margin-left: 1rem;
`

export const container = css`
  & > *:not(:first-child) {
    margin-left: 1rem;
  }

  & > :first-child {
    margin-left: 2rem;
  }
`
