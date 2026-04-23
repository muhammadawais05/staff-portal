import { css } from 'styled-components'

export const loaderStyle = `width: 150px;`

export const cellWidth = (index: number) => css`
  width: ${index ? 'auto' : '24rem'};
`
