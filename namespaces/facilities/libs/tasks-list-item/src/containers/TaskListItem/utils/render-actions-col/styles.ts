import { css } from 'styled-components'

import { TASK_LIST_BREAKPOINTS } from '../../styles'

/**
 * After adding the collapsible menu, the page center content has a fixed width.
 * Because of that, on small screens, the center content will have the same width as on large,
 * so it doesn't make any sense to have a different look on small screens at this moment.
 *
 * If the support for the small screens is added in the future, this can be used again.
 */
export const buttonOnSmallScreen = css`
  @media (min-width: ${TASK_LIST_BREAKPOINTS.medium}px) {
    margin-left: 0.5rem;
  }
`
