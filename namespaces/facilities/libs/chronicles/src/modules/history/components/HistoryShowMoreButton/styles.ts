import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const button = css`
  &&,
  &:hover {
    border-radius: 0;
    color: ${palette.blue.main};
    background-color: ${palette.blue.lighter};
    height: 2.5rem;
    border-top: 1px solid ${palette.grey.lighter2};
    border-bottom: 1px solid ${palette.grey.lighter2};
    font-weight: 400;

    span {
      font-size: 0.875rem;
    }

    svg {
      color: ${palette.blue.main};
    }
  }
`
