import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const flexGrow = css`
  flex-grow: 1;
`

export const tagStyle = (border: boolean) => css`
  background-color: transparent;
  border-color: ${border ? palette.blue.main : undefined};
`
