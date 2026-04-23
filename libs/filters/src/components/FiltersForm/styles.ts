import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const filtersGrid = css`
  > *:not(:last-child) {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${palette.grey.light2};
  }
`
