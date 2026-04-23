import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const connectionsIcon = css`
  margin-left: 0.75em;
  margin-right: 0.25em;
`

export const skillTag = css`
  color: ${palette.common.white};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`

export const rank1 = css`
  &,
  :hover,
  :focus {
    border-color: ${palette.blue.light};
    background: ${palette.blue.light};
  }
`

export const rank2 = css`
  &,
  :hover,
  :focus {
    border-color: ${palette.blue.main};
    background: ${palette.blue.main};
  }
`

export const rank3 = css`
  &,
  :hover,
  :focus {
    border-color: ${palette.blue.darker};
    background: ${palette.blue.darker};
  }
`

export const skillName = css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12.5rem;
`
