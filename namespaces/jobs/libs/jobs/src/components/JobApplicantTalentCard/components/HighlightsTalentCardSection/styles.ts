import { css } from 'styled-components'

export const itemContainer = css`
  & + & {
    margin-top: 1rem;
  }
`
export const offsetContainer = css`
  margin-top: -0.125rem;
`
