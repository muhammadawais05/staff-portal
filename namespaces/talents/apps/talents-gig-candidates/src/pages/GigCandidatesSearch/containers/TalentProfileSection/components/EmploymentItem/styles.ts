import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const summaryContainer = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
`

export const employmentContainer = css`
  margin-right: 48px;
`

export const accordion = css`
  padding: 7px 0;
  width: 100%;
  border-top: ${palette.grey.lighter} 1px solid;

  &:last-child {
    border-bottom: ${palette.grey.lighter} 1px solid;
  }
`
