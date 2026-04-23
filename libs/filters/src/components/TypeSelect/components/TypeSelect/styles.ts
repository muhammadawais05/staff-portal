import { css } from 'styled-components'

export const dropdown = css`
  position: relative;

  > div {
    width: 100%;
  }

  > div[role='tooltip'] > div > div {
    height: 25rem;
    max-height: 25rem;
  }
`

export const tag = css`
  margin-right: 0.375rem;
  margin-bottom: 0.375rem;
`
