import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const withBorder = css`
  border-bottom: 1px solid ${palette.grey.lighter};
`

export const buttonContainer = css`
  > * + * {
    margin-left: 1rem;
  }
`
