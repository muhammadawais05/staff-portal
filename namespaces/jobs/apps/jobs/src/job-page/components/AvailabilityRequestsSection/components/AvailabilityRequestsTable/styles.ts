import { css } from 'styled-components'

export const tableContainer = css`
  overflow-x: auto;
`

export const tableRow = css`
  td,
  th {
    padding-top: 0.5rem;
    padding-bottom: 0;
    height: 2.75rem;
  }
`

const common = css`
  && {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`

export const talentCol = css`
  max-width: 7rem;
  ${common}
`

export const createdCol = css`
  min-width: 3rem;
  max-width: 4rem;
  ${common}
`

export const bestMatchCol = css`
  min-width: 5rem;
  max-width: 6rem;
  ${common}
`

export const ratesCol = css`
  min-width: 4rem;
  max-width: 5rem;
  ${common}
`

export const availabilityCol = css`
  min-width: 4rem;
  max-width: 7rem;
  ${common}
`

export const statusCol = css`
  min-width: 8rem;
  max-width: 8rem;
  ${common}
`

export const actionsCol = css`
  width: 6rem;
  ${common}
`
