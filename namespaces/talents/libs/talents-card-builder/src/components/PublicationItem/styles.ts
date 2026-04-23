import { screens } from '@toptal/picasso/utils'
import { css } from 'styled-components'

import { listItemContent } from '../../components/ApplicationCardListItem/styles'

export const listItemContentComponent = css`
  ${listItemContent}
  ${screens('large', 'extra-large')} {
    padding-right: 24px;
  }
`
