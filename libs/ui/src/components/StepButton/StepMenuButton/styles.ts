import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const menuButtonRoot = css`
  height: 2em;
  margin-left: -1px;
  padding: 0 0.25em;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  min-width: 2rem;

  &:enabled {
    color: ${palette.grey.darker};
  }

  &:hover:enabled,
  &:focus:enabled {
    z-index: 1;
  }
`
