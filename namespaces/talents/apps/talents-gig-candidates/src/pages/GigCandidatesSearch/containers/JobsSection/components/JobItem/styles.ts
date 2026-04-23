import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const container = css`
  padding-top: 7px;
  display: flex;
  border-bottom: ${palette.grey.lighter} 1px solid;
  width: 100%;

  &:first-child {
    border-top: ${palette.grey.lighter} 1px solid;
  }
`

export const accordion = css`
  width: 100%;
`

export const summaryContainer = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
`

export const jobContainer = css`
  margin-right: 48px;
  max-width: 66%;
  flex-direction: column;
`

export const client = css`
  white-space: nowrap;
  flex-wrap: nowrap;
`

export const clientContainer = css`
  white-space: nowrap;
  flex-wrap: wrap;
`

export const skillTag = css`
  color: ${palette.common.white};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`

export const skillName = css`
  color: ${palette.common.black};
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12.5rem;
`
