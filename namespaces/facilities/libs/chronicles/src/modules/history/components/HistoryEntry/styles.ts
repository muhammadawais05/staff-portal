import { css } from 'styled-components'

import { HistoryWidgetVariant } from '../../types'

export const commentWrapper = (variant?: HistoryWidgetVariant) => css`
  word-break: break-word;
  ${variant === 'timeline' && 'font-style: italic;'}
`
