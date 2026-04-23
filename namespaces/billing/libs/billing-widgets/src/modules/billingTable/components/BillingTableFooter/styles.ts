import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const tableFooterCell = (isCondensed: boolean) => css`
  && {
    font-weight: bold;
    color: ${palette.common.black};
    ${isCondensed &&
    `
      padding: 3px;
      &:first-child {
        padding-left: 3.5rem;
      }`}

    &:last-child {
      padding-right: 1rem;
    }
  }
`

export { tableFooterCell }
