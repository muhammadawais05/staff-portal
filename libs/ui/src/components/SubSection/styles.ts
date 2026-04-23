import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const section = css`
  padding: 0 0 1.5rem;
  border-bottom: 1px solid ${palette.grey.light2};
  margin-bottom: 1.5rem;
`

export const borderless = css`
  border-bottom: none;
`

export const lastSection = css`
  border: none;
  margin-bottom: 0;
  padding-bottom: 0;
`
