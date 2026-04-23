import { css } from 'styled-components'

import { TASK_LIST_BREAKPOINTS } from '../../styles'

export const dueDateWrapper = css`
  width: 7rem;
`

/**
 * After adding the collapsible menu, the page center content has a fixed width.
 * Because of that, on small screens, the center content will have the same width as on large,
 * so it doesn't make any sense to have a different look on small screens at this moment.
 *
 * If the support for the small screens is added in the future, this can be used again.
 */
export const dueDateWrapperOnSmallScreen = css`
  @media (min-width: ${TASK_LIST_BREAKPOINTS.medium}px) {
    width: 7.75rem;
  }
`

export const dueDate = css`
  > div {
    align-items: center;
  }
`
