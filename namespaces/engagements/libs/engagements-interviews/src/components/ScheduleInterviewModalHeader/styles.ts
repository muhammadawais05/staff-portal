import { css } from 'styled-components'

export const scheduleAlert = css`
  > div {
    width: 100%;

    /* this is needed to to spacing between the text and the scheduling switch button */
    > div:nth-child(even) {
      flex-grow: 1;
    }
  }
`
