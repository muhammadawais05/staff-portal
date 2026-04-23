import { css } from 'styled-components'

export const closeButton = css`
  position: absolute;
  right: 1em;
  top: 1em;

  & + button {
    display: none;
  }
`

export const modalTitle = css`
  margin: 1em;
`
