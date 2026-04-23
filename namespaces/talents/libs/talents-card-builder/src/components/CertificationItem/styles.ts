import { screens } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const content = css`
  flex: 1;
`

export const aside = css`
  margin-left: 16px;

  ${screens('large', 'extra-large')} {
    margin-right: 24px;
  }
`
