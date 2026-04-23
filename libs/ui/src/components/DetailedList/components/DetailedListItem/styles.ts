import { css } from 'styled-components'

// Prevents a bug in Chrome for displaying the tooltip when there are
// multiple columns in an row inside the Detailed List
// Remove this when this ticket is resolved: https://toptal-core.atlassian.net/browse/FX-1758
const MIN_SAFE_WIDTH = 0.001

export const listItem = (width: number) => {
  const itemWidth = width - MIN_SAFE_WIDTH

  return css`
    flex-basis: ${itemWidth}%;
    max-width: ${itemWidth}%;
`
}
