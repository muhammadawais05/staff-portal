import { css } from 'styled-components'

const selectorWidth = '1rem'
const idWidth = '4rem'
const recipientWidth = '6rem'
const amountWidth = '4rem'
const dateWidth = '5.5rem'

const baseCellStyle = `
  vertical-align: top;
`

const table = css`
  table-layout: fixed;
`

const headerCellSelector = css`
  && {
    width: ${selectorWidth};
    ${baseCellStyle}
  }
`

const headerCellId = css`
  && {
    width: ${idWidth};
    ${baseCellStyle}
  }
`

const headerCellRecipient = css`
  && {
    width: ${recipientWidth};
    ${baseCellStyle}
  }
`

const headerCellAmount = css`
  && {
    text-align: right;
    width: ${amountWidth};
    ${baseCellStyle}
  }
`

const headerCellDate = css`
  && {
    width: ${dateWidth};
    ${baseCellStyle}
  }
`

export {
  headerCellSelector,
  headerCellId,
  headerCellRecipient,
  headerCellAmount,
  headerCellDate,
  table
}
