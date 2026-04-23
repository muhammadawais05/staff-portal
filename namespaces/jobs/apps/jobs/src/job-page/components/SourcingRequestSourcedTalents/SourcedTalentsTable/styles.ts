import { css } from 'styled-components'

export const tableRow = css`
  td,
  th {
    padding-top: 0.5rem;
    padding-bottom: 0;
    height: 2.75rem;
  }
`

const common = `
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export const talentCol = css`
  max-width: 10rem;
  ${common}
`

export const statusCol = css`
  min-width: 5rem;
  max-width: 7rem;
  ${common}
`

export const actionsCol = css`
  width: 8rem;
`
