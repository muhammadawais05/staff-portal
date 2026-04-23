import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const connectionsIcon = css`
  margin-left: 0.75em;
  margin-right: 0.25em;
`

export const industryTag = css`
  color: ${palette.common.white};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  &,
  :hover,
  :focus {
    border-color: ${palette.blue.darker};
    background: ${palette.blue.darker};
  }
`

export const industryName = css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12.5rem;
`
