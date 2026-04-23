import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const questionWrapper = css`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.grey.lighter2};

  &:last-child {
    margin-bottom: 0;
  }
`

export const inputWrapper = css`
  flex: 1;
`
