import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const summaryContainer = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
`

export const accordion = css`
  padding: 7px 0;
  border-top: ${palette.grey.lighter} 1px solid;

  &:last-child {
    border-bottom: ${palette.grey.lighter} 1px solid;
  }

  & > * > * {
    min-width: 0;
  }
`

export const projectContainer = css`
  margin-right: 48px;
  min-width: 0;
`
