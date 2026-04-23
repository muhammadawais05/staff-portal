import { css } from 'styled-components'
import {
  STAFF_PORTAL_BACKGROUND_COLOR,
  STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH
} from '@staff-portal/ui'

/**
 * On Windows/Linux, the page resolution also includes the scroll bar.
 * To avoid displaying the collapsible menu on Mac devices when the
 * page resolution is 1440px, we reduce the sidebar menu to 256px and
 * the maximum page width from 1440px to 1424px.
 * The center page content width shouldn't change in any circumstances.
 */
const PAGE_MAX_WIDTH = '89rem'
const PAGE_MIN_WIDTH = '74.75rem'
const PAGE_ARTICLE_MAX_WIDTH = '57rem'
const PAGE_SIDEBAR_MIN_WIDTH = '16rem'
const PAGE_MOBILE_SIDEBAR_MIN_WIDTH = '1.75rem'
const PAGE_WITHOUT_SUMMARY_SIDEBAR_MAX_WIDTH = '73rem'
const PAGE_WITHOUT_SUMMARY_SIDEBAR_MIN_WIDTH = '58.75rem'

const page = css`
  height: 100%;
  min-width: ${PAGE_MIN_WIDTH};
`

const topBarWrapper = css`
  top: 0;
  right: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
`

const topBar = ({
  isThreeColumnsLayout
}: {
  isThreeColumnsLayout: boolean
}) => {
  const pageMaxWidth = isThreeColumnsLayout
    ? PAGE_MAX_WIDTH
    : PAGE_WITHOUT_SUMMARY_SIDEBAR_MAX_WIDTH

  const pageMinWidth = isThreeColumnsLayout
    ? PAGE_MIN_WIDTH
    : PAGE_WITHOUT_SUMMARY_SIDEBAR_MIN_WIDTH

  const headerRightPadding = isThreeColumnsLayout ? '1.5em' : '2em'

  return css`
    top: 0;
    left: 0;
    right: 0;
    position: relative;

    && > div {
      max-width: ${pageMaxWidth};
      padding: 0 ${headerRightPadding} 0 1.5em;
    }

    ${isThreeColumnsLayout &&
    css`
      @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
        && > div {
          width: ${pageMinWidth};
          padding: 0 ${headerRightPadding} 0 2em;
        }
      }
    `}/* stylelint-disable-next-line */
  `
}

const quickSearchWrapper = css`
  margin-left: 10rem;
`

const pageGridTemplate = css`
  grid-template-columns:
    minmax(${PAGE_SIDEBAR_MIN_WIDTH}, auto)
    minmax(auto, ${PAGE_ARTICLE_MAX_WIDTH})
    minmax(${PAGE_SIDEBAR_MIN_WIDTH}, auto);

  @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
    && {
      grid-template-columns:
        minmax(${PAGE_MOBILE_SIDEBAR_MIN_WIDTH}, auto) minmax(
          auto,
          ${PAGE_ARTICLE_MAX_WIDTH}
        )
        minmax(${PAGE_SIDEBAR_MIN_WIDTH}, auto);
    }
  }
`

const pageWithoutSummarySidebarGridTemplate = css`
  grid-template-columns:
    minmax(${PAGE_SIDEBAR_MIN_WIDTH}, auto)
    minmax(auto, ${PAGE_ARTICLE_MAX_WIDTH})
    auto;

  @media (max-width: ${STAFF_PORTAL_COLLAPSIBLE_MENU_MEDIA_QUERY_MAX_WIDTH}) {
    && {
      grid-template-columns:
        minmax(${PAGE_MOBILE_SIDEBAR_MIN_WIDTH}, auto)
        minmax(auto, ${PAGE_ARTICLE_MAX_WIDTH})
        auto;
    }
  }
`

const fixedPageContent = ({
  isThreeColumnsLayout
}: {
  isThreeColumnsLayout: boolean
}) => {
  const gridTemplate = isThreeColumnsLayout
    ? pageGridTemplate
    : pageWithoutSummarySidebarGridTemplate

  return css`
    display: grid;
    justify-content: initial;

    && > div {
      display: contents;
    }

    ${gridTemplate}/* stylelint-disable-next-line */
  `
}

// prettier-ignore
const contentBackground = css`
  background: ${STAFF_PORTAL_BACKGROUND_COLOR};

  & > div {
    width: 100%;
    max-width: ${PAGE_MAX_WIDTH};
    background-color: ${STAFF_PORTAL_BACKGROUND_COLOR};
  }
`

const article = css`
  margin: 0;
  padding: 0 2rem;
  overflow-x: auto;
`

export {
  quickSearchWrapper,
  page,
  fixedPageContent,
  article,
  contentBackground,
  topBar,
  topBarWrapper
}
