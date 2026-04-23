import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const button = css`
  border-radius: 0;
  color: ${palette.blue.main};
  background-color: ${palette.grey.light};
  height: 2.5rem;
  border-top: 1px solid ${palette.grey.light2};
  border-bottom: 1px solid ${palette.grey.light2};

  span {
    font-size: 0.875rem;
  }

  svg {
    color: ${palette.grey.dark};
  }
`
