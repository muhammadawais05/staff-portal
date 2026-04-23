import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const industryField = css`
  background-color: ${palette.blue.main};
  cursor: pointer;
  color: ${palette.common.white};
  margin-bottom: 0.5rem;
`

export const industryName = css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12.5rem;
`
