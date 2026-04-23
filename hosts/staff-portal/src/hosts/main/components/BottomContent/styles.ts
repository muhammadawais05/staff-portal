import { css } from 'styled-components'

const bottomContainer = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`

const bottomUpContainer = css`
  position: absolute;
  width: 100%;
  bottom: 0;
`

const helpButtonPortal = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`

export { bottomContainer, bottomUpContainer, helpButtonPortal }
