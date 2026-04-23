import { css } from 'styled-components'

import { NAVIGATION_HEIGHT } from '../ProjectNavigation/constants'

export const accordion = css`
  width: 100%;
`

export const summaryContainer = css`
  height: 100%;
  overflow-y: auto;
`

export const summaryItems = css`
  flex-wrap: wrap;
  padding-bottom: ${NAVIGATION_HEIGHT}rem;
`
