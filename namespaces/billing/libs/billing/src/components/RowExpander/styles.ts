import { css } from 'styled-components'

const arrowDownMinor16 = (isExpanded: boolean) => css`
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: rotate(${isExpanded ? '180deg' : '0deg'});
`

export { arrowDownMinor16 }
