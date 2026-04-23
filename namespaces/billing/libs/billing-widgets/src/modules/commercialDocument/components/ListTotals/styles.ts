import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

import { getNumberOfItemsARow } from './utils'

export const item = ({ has9Items }: { has9Items: boolean }) => {
  const { largeScreen: largescreen } = getNumberOfItemsARow({ has9Items })

  return css`
    & {
      flex-basis: ${100 / largescreen}%;

      :nth-child(${largescreen}n + 1) {
        border: none;
      }

      :nth-child(n + ${largescreen + 1}) {
        margin-top: 1rem;
      }
    }
    /* stylelint-disable-next-line */
  `
}

/**
 * After adding the collapsible menu, the page center content has a fixed width.
 * Because of that, on small screens, the center content will have the same width as on large,
 * so it doesn't make any sense to have a different look on small screens at this moment.
 *
 * If the support for the small screens is added in the future, this function can be used again.
 */
export const itemOnSmallScreen = (smallScreen: number) => css`
  && {
    @media (max-width: 1399px) {
      flex-basis: ${100 / smallScreen}%;
      border-left: 1px solid ${palette.grey.light2};

      :nth-child(${smallScreen}n + 1) {
        border: none;
      }

      :nth-child(n + ${smallScreen + 1}) {
        margin-top: 1rem;
      }
    }
  }
`

export const group = css`
  > div {
    flex-wrap: wrap;
  }
`
