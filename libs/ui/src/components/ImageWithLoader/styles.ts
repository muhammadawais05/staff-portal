import { css } from 'styled-components'

export const image = css`
  display: none;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  transition: opacity 0.2s;
  width: auto;
`

export const imageVisible = css`
  display: block;
`

export const loader = css`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`
