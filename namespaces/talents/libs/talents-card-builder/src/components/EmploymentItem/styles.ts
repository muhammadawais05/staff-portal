import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

export const title = (onClick: boolean) => css`
  margin-bottom: 4px;

  ${onClick &&
    css`
      &:hover {
        cursor: pointer;
        /* stylelint-disable-next-line */
        color: ${palette.red.main};
      }
    `};
`

export const employmentItemContainer = css`
  &:not(:first-child) {
    margin-top: 24px;
  }
`

export const list = css`
  /* stylelint-disable-next-line */
  margin: 14px 0 0 0;
  padding: 0;
`

export const opacityStyle = (highlighted: boolean) => css`
  opacity: ${highlighted ? 1 : 0.5};
`
