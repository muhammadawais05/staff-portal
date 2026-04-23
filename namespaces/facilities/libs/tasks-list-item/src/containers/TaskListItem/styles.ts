import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'
import { TableExpandableRowProps } from '@toptal/picasso/TableExpandableRow'

const topShadow = `0 1px 0 0 ${palette.grey.lighter} inset`
const rightShadow = `-1px 0 0 0 ${palette.grey.lighter} inset`
const bottomShadow = `0 1px 0 0 ${palette.grey.lighter}`
const leftShadow = `1px 0 0 0 ${palette.grey.lighter} inset`

export const TASK_LIST_BREAKPOINTS = {
  medium: 1335
}

const focusedLink = css`
  a:focus .focused-link {
    outline: 1px dotted ${palette.blue.main};
  }
`

export const taskListItemRow = css<Pick<TableExpandableRowProps, 'expanded'>>`
  vertical-align: top;

  & > td {
    > div > :first-child {
      min-height: 1.5rem;
    }
  }

  ${({ expanded }) =>
    expanded &&
    css`
      box-shadow: ${topShadow}, ${rightShadow}, ${bottomShadow}, ${leftShadow};
    `}
`
export const taskDescriptionContainer = css`
  min-width: 0;
`
const common = css`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export const checkboxColHeader = css`
  width: 3rem;
`

export const checkboxCol = css`
  ${checkboxColHeader}
`

export const priorityColHeader = css`
  width: 3.5rem;
  ${common}
`

export const priorityCol = css`
  ${priorityColHeader}
`

export const nameColHeader = css`
  max-width: 14rem;
  min-width: 7rem;
  ${common}
`

export const nameCol = css`
  ${nameColHeader}
`

export const dueDateColHeader = css`
  width: 7.3rem;
  ${common}
`

/**
 * After adding the collapsible menu, the page center content has a fixed width.
 * Because of that, on small screens, the center content will have the same width as on large,
 * so it doesn't make any sense to have a different look on small screens at this moment.
 *
 * If the support for the small screens is added in the future, this  can be used again.
 */
export const dueDateColHeaderOnSmallScreen = css`
  @media (min-width: ${TASK_LIST_BREAKPOINTS.medium}px) {
    width: 8.875rem;
  }
`

export const dueDateCol = css`
  ${dueDateColHeader}
`

export const relatedToColHeader = css`
  width: 15%;
  min-width: 4.6rem;
  max-width: 8rem;
  ${common}
  ${focusedLink}
`

export const relatedToCol = css`
  ${relatedToColHeader}
`

export const timeColHeader = css`
  width: 5.75rem;
  ${common}
`

export const timeCol = css`
  ${timeColHeader}
`

export const assigneeColHeader = css`
  width: 3.625rem;
  padding-left: 0.5rem;
  padding-right: 0;
  ${focusedLink}
`

export const assigneeCol = css`
  ${assigneeColHeader}
`

export const actionsColHeader = css`
  && {
    padding-right: 0.188rem;
  }

  padding-left: 0.625rem;
`

/**
 * After adding the collapsible menu, the page center content has a fixed width.
 * Because of that, on small screens, the center content will have the same width as on large,
 * so it doesn't make any sense to have a different look on small screens at this moment.
 *
 * If the support for the small screens is added in the future, this can be used again.
 */
export const actionsColHeaderOnSmallScreen = css`
  @media (min-width: ${TASK_LIST_BREAKPOINTS.medium}px) {
    && {
      padding-right: 1.5rem;
    }

    padding-left: 1rem;
    width: 6rem;
    max-width: 7rem;
  }
`

export const ColumnHeaderStyles = {
  checkboxColHeader,
  priorityColHeader,
  nameColHeader,
  dueDateColHeader,
  relatedToColHeader,
  timeColHeader,
  assigneeColHeader,
  actionsColHeader
}

export const actionsCol = css`
  ${actionsColHeader}
`
