import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const spacing = 8

export const grid = css`
  margin: -${spacing}px -${spacing}px 0;
  width: 100%;
`

export const gridItem = css`
  line-height: 1rem;

  && {
    padding: ${spacing + 2}px ${spacing - 3}px ${spacing + 2}px ${spacing}px;
  }
`

export const gridItemHighlighted = css`
  background-color: ${palette.grey.light};
  border-radius: 5px;
`

export const filtersField = css`
  margin-bottom: -${spacing}px;
`

export const subFilters = css`
  background-color: ${palette.grey.light};
  border-radius: 5px;
  padding-left: 0;
  padding-right: 0;
`

export const labelTypography = css`
  line-height: 1rem;
`
