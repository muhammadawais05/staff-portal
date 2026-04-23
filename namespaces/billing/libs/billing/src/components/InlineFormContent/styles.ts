import { palette, colorUtils } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const stripedRow = css`
  background-color: ${colorUtils.alpha(palette.grey.lighter2, 0.32)};
`
export const flexGrow = css`
  flex-grow: 1;
`
