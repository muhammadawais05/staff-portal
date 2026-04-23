import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const autocompleteHighlight = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  > strong {
    color: ${palette.common.black};
  }
`
