import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const entryItem = css`
  padding-bottom: 1.5rem;
  border-bottom: 1px ${palette.grey.lighter} solid;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`
