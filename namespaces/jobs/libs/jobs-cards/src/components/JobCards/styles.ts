import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const taskCardsContainer = css`
  height: 100%;
`

export const taskCardContent = css`
  flex-grow: 1;
  background-color: ${palette.common.white};
  border-top: 1px solid ${palette.grey.lighter};
  border-right: 1px solid ${palette.grey.lighter};
`
