import { css } from 'styled-components'

// TODO: Remove this styles when Button.Group get updated
export const buttonLeft = `
border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  
  &:active, &:hover, &:focus {
    z-index: 1
  }
`
export const buttonRight = `
  margin-left: -1px !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
`

export const dropdown = css`
  [role='tooltip'] {
    z-index: 1000;
  }
`
