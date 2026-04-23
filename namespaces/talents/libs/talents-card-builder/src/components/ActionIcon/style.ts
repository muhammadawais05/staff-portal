import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const actionIcon = css`
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  width: 24px;
  height: 24px;

  &.default {
    border-color: ${palette.blue.main};
  }

  &.default-hovered {
    border-color: ${palette.blue.main};
    background-color: ${palette.blue.main};
  }

  &.highlighted {
    border-color: ${palette.green.main};
    background-color: ${palette.common.white};
  }

  &.highlighted-hovered {
    border-color: ${palette.red.main};
    background-color: ${palette.common.white};
  }
`
