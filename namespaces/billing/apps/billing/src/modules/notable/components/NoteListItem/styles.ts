import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

export const note = css`
  border-radius: 0.4rem;
  border: 1px solid ${palette.grey.lighter};
  position: relative;
  overflow: hidden;

  &::before {
    background: ${palette.yellow.main};
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    content: '';
    top: 0;
    width: 0.2rem;
  }
`
