import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const table = css`
  width: auto;

  tr > td {
    height: 0;
    padding: 0 2.5rem 0.5rem 0;
  }
`

export const skill = css`
  :hover {
    text-decoration: none;
  }
`

export const skillLink = css`
  :hover {
    background-color: ${palette.blue.lighter};
    border-color: ${palette.blue.lighter};
    color: ${palette.blue.dark};
    cursor: pointer;
  }
`

export const tableRow = css`
  background: none;
`
