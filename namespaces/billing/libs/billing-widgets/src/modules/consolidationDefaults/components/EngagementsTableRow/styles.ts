import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const rowStyle = (isDisabled: boolean) =>
  isDisabled
    ? css`
        && {
          background-color: ${palette.grey.lighter};

          a {
            color: ${palette.grey.main};
          }
        }
`
    : undefined
