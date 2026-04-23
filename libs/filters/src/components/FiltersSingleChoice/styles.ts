import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

// TODO: remove once these styles have been ported to Picasso
export const select = css`
  background: ${palette.common.white};
  border-radius: 4px;
`

export const gridItem = css`
  padding-right: 0 !important;
`

export const subFilters = css`
  align-self: flex-start;
  background-color: ${palette.grey.light};
  border-radius: 5px;
  padding-left: 0;
  padding-right: 0;

  label:first-child {
    padding-left: 1rem;
  }
`

export const radioGroupContainer = css`
  div {
    width: 100%;
  }
`
