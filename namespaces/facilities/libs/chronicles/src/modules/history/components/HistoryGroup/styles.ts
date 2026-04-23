import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const historyGroupTable = css`
  margin-top: 1.5rem;
`

export const tableBody = css`
  && {
    border-top: 1px solid ${palette.grey.lighter2};
  }
`

export const historyGroupTimeline = css`
  &:first-child {
    padding-top: 0;
  }
`
