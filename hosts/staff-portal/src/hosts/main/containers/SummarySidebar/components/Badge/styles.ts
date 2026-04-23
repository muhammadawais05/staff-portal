import { ReactNode } from 'react'
import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const container = (children: ReactNode) => css`
  width: 45%;
  float: right;
  ${children &&
  css`
    > :last-child {
      margin-top: -105%;
    }
  `}
`

export const children = css`
  float: left;
`

export const badge = css`
  width: 1.375rem;
  height: 1.375rem;
  padding: 0 0.375rem;
  border-radius: 0.6875rem;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.375rem;
  color: ${palette.common.white};
  border-color: ${palette.red.main};
  background-color: ${palette.red.main};
  cursor: pointer;
  float: right;
`
