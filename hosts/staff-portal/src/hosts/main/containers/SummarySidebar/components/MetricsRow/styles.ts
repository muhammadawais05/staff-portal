import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const row = css`
  padding: 0.25rem;

  :nth-child(odd) {
    background-color: ${palette.grey.lighter2};
  }
`
