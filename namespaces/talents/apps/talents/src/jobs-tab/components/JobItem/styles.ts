import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const container = css`
  & + & {
    margin-top: 0;
    padding-top: 2rem;
    border-top: ${palette.grey.lighter} 1px solid;
  }

  &:last-child {
    border-bottom: ${palette.grey.lighter} 1px solid;
  }
`
