import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const stripedRow = css`
  &:nth-child(even) {
    background-color: ${palette.grey.lighter};
  }
`

export const dividedRow = css`
  border-top: 1px solid ${palette.grey.lighter};

  &:last-child {
    border-bottom: 1px solid ${palette.grey.lighter};
  }
`
