import { css } from 'styled-components'

const wrapper = (isHidden: boolean) => css`
  ${isHidden &&
  `
    display: none
  `}
`

export { wrapper }
