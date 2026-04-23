import { css } from 'styled-components'

export const image = css`
  width: 100%;
  max-width: 10rem;
  border-radius: 0.5rem;
  cursor: pointer;
`

export const imageContainer = css`
  min-width: 0;

  & + & {
    margin-left: 1rem;
  }
`

export const lastImage = css`
  margin-right: 0;
`
