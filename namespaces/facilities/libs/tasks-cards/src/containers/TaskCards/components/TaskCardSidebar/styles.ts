import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

// TODO: remove after https://toptal-core.atlassian.net/browse/FX-1021
const sidebarItemStyles = css`
  /* stylelint-disable selector-class-pattern */
  &.Mui-selected,
  &.Mui-selected:hover,
  &.Mui-selected:active,
  &.Mui-selected:focus {
    background-color: #e5e7ea;
    border-radius: 3px;
  }
  /* stylelint-enable selector-class-pattern */
`

export const sidebarMenu = css`
  padding: 1rem 0;

  li {
    padding-right: 0.5rem;
    padding-left: 1rem;
    height: 3.625rem;
    ${sidebarItemStyles}
  }
`

export const taskCardSidebar = css`
  && {
    background-color: #f3f4f6;
    padding: 1px;
    min-width: 12.5rem;
    width: 12.5rem;

    li {
      margin-bottom: 0.25rem;
    }

    > ul {
      box-shadow: -1px -1px 0 0 ${palette.grey.lighter};
    }

    ul ul {
      padding: 0;

      & > li {
        padding-left: 2rem;
        margin-bottom: 0.25rem;
      }
    }
  }
`

export const taskCardSidebarItemContent = css`
  display: grid;
`

export const taskCardSidebarItemSubtitle = css`
  font-size: 11px;
  line-height: 16px;
`
