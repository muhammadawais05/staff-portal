import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const typography = (isRemoved?: boolean) => css`
  ${isRemoved &&
  `
      && {
        text-decoration: line-through;
        color: ${palette.grey.main};
      }
    `}
`

const tableExclamationIcon = css`
  margin-left: 0.5rem;
  color: ${palette.grey.light};
`

export { typography, tableExclamationIcon }
