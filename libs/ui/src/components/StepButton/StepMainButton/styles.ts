import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const mainButtonRoot = css`
  height: 2rem;
  justify-content: flex-start;
  padding: 0 0.75rem 0 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;

  span {
    overflow: hidden;
  }

  &:enabled {
    color: ${palette.grey.darker};
  }

  &:disabled {
    color: ${palette.grey.main};
  }

  &:hover:enabled,
  &:focus:enabled {
    z-index: 1;
  }
`

export const mainButtonContent = css`
  width: 100%;
`
