import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const border = ({ borderColor = palette.grey.lighter2 }) => css`
  border-top: solid 1px ${borderColor};
`
