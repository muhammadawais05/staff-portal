import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const quizItem = css`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.grey.lighter};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom-width: 0;
  }
`
