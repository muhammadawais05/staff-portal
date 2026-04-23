import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const container = css`
  padding-top: 7px;
  display: flex;
  border-top: ${palette.grey.lighter} 1px solid;
  width: 100%;

  &:last-child {
    border-bottom: ${palette.grey.lighter} 1px solid;
  }
`
