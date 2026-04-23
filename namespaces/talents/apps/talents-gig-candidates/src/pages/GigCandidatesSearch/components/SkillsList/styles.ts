import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const container = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-wrap: wrap;
  min-width: 34%;
  height: fit-content;
`

export const greyDarkFont = `
  color: ${palette.grey.dark}
`

export const greyFont = `
  color: ${palette.grey.main}
`

export const whiteTag = css`
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
