import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const row = css`
  border-bottom: 1px solid ${palette.grey.lighter};
  padding-left: 0;
  padding-right: 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`
