import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const listItemContainer = css`
  cursor: pointer;
  display: flex;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

export const listItemContent = css`
  display: flex;
  flex: 1;
  padding: 8px;
  border-width: 1px;
  border-style: dashed;

  &.default {
    border-color: ${palette.grey.main};
    opacity: 0.5;
  }

  &.default-hovered {
    border-color: ${palette.blue.main};
  }

  &.highlighted {
    border-style: solid;
    border-color: ${palette.green.main};
  }

  &.highlighted-hovered {
    border-color: ${palette.red.main};
  }
`

export const iconMargin = css`
  margin: 6px 16px 6px 0;
`
