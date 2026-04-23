import { css } from 'styled-components'

const correctedSidePadding = '.25rem'
const correctedSideFirstPadding = '.5rem'
const correctedSideLastPadding = '.5rem'

const table = (fixedWidth?: boolean) => css`
  && {
    ${fixedWidth ? 'table-layout: fixed;' : ''}
    & > thead > tr > th,
    & > tbody > tr > td {
      padding-left: ${correctedSidePadding};
      padding-right: ${correctedSidePadding};

      &:first-child {
        padding-left: ${correctedSideFirstPadding};
      }

      &:last-child {
        padding-right: ${correctedSideLastPadding};
      }
    }
  }
`

export const container = (fixedHeight?: string) =>
  fixedHeight
    ? css`
        && {
          height: ${fixedHeight};
          overflow: auto;
        }
`
    : undefined

export { table }
