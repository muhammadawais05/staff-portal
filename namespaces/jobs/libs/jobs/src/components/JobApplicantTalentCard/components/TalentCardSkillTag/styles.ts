import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const skillName = css`
  overflow: hidden;
  text-overflow: ellipsis;
`
export const tag = css`
  color: ${palette.common.white};

  &,
  :hover,
  :focus {
    border-color: ${palette.blue.main};
    background: ${palette.blue.main};
  }
`
