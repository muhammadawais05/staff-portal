import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const deleteButton = css`
  &&:hover,
  &&:active,
  span,
  svg {
    color: ${palette.red.main};
  }
`
