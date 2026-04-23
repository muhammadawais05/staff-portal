import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const singleQuestionContainer = css`
  &:not(:first-child) {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${palette.grey.light2};
  }
`

export const questionAnswer = css`
  overflow-wrap: anywhere;
`
