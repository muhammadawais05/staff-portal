import { css } from 'styled-components'

const common = `
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

export const skillColumn = css`
  max-width: 12rem;
  white-space: nowrap;
  ${common}
`
export const verticalsColumn = css`
  max-width: 5rem;
  ${common}
`
export const expandingColumn = css`
  max-width: 2rem;
  ${common}
`
export const checkColumn = css`
  max-width: 3rem;
  white-space: nowrap;
  text-align: center;
  ${common}
`
export const actionsColumn = css`
  width: 6rem;
  max-width: 6rem;
`

export const verticalColumn = css`
  max-width: 4rem;
`

export const boolColumn = css`
  width: 1rem;
`
