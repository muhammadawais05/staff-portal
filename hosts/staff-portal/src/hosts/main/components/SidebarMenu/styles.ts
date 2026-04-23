import {
  STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH,
  STAFF_PORTAL_SIDEBAR_BACKGROUND_COLOR
} from '@staff-portal/ui'
import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const SIDEBAR_WIDTH = '16rem'
const MOBILE_SIDEBAR_WIDTH = '1.75rem'

const noLinkUnderline = css`
  a:hover {
    text-decoration: none;
  }
`

export const sidebarWrapper = css`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${STAFF_PORTAL_SIDEBAR_BACKGROUND_COLOR};
  z-index: 1001;
`

export const menuLoader = ({
  isThreeColumnsLayout
}: {
  isThreeColumnsLayout: boolean
}) =>
  isThreeColumnsLayout &&
  css`
    @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
      display: none;
    } /* stylelint-disable-next-line */
  `

export const sidebarCollapsibleButton = ({
  expanded,
  isThreeColumnsLayout
}: {
  expanded: boolean
  isThreeColumnsLayout: boolean
}) => css`
  display: none;
  position: sticky;
  top: 4.5rem;
  margin-bottom: -1.5rem;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 0 8px 0 rgba(0 0 0 / 16%);
  transition: transform 0.2s, margin-right 0.5s;
  z-index: 1002;

  ${isThreeColumnsLayout &&
  css`
    @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
      display: flex;
      /* stylelint-disable-next-line value-keyword-case */
      margin-right: calc(-1 * (${expanded ? SIDEBAR_WIDTH : MOBILE_SIDEBAR_WIDTH} + 0.75rem));

      ${expanded &&
      css`
        transform: rotate(-180deg);
      `}
    }
  `}
`

export const sidebarSideArea = ({
  expanded,
  isThreeColumnsLayout
}: {
  expanded: boolean
  isThreeColumnsLayout: boolean
}) => css`
  display: none;

  ${isThreeColumnsLayout &&
  css`
    @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: ${expanded ? 'calc(100% - 0.75rem)' : '100%'};
      height: 100%;
      z-index: 1001;
      cursor: pointer;
    }
  `}
`

export const sidebar = ({
  isThreeColumnsLayout
}: {
  isThreeColumnsLayout: boolean
}) => css`
  width: ${SIDEBAR_WIDTH};
  padding: 0;
  flex-shrink: 0;

  ${isThreeColumnsLayout &&
  css`
    @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
      width: ${MOBILE_SIDEBAR_WIDTH};

      ::before {
        display: none;
      }
    }
  `}
`

export const menuWrapper = ({
  expanded,
  isThreeColumnsLayout
}: {
  expanded: boolean
  isThreeColumnsLayout: boolean
}) => css`
  background-color: ${STAFF_PORTAL_SIDEBAR_BACKGROUND_COLOR};
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: inset -1px 0 0 0 ${palette.grey.lighter2};

  ${isThreeColumnsLayout &&
  css`
    @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
      transition: width 0.5s;

      ${expanded &&
    css`
        width: ${SIDEBAR_WIDTH};
        transition: width 0.5s 0s;

        > ul {
          width: ${SIDEBAR_WIDTH};
          transition: width 0.5s 0s;
        }
      `}
    }
  `}
`

export const menu = ({
  isThreeColumnsLayout
}: {
  isThreeColumnsLayout: boolean
}) => css`
  padding: 1rem 0;
  width: 100%;

  ${isThreeColumnsLayout &&
  css`
    @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
      overflow: hidden;
      width: 0;
      transition: width 0.5s;

      > * {
        width: ${SIDEBAR_WIDTH};
      }
    }
  `}

  ${noLinkUnderline}
`
