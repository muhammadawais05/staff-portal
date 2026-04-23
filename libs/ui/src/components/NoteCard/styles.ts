import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const noLeftBorder = css`
  &::before {
    display: none;
  }
`

export const yellowNote = css`
  border: 1px solid ${palette.yellow.main};
  background-color: ${palette.yellow.lighter};
`
