import { css } from 'styled-components'

const checkBoxWidth = '3rem'
const idWidth = '3rem'
const amountWidth = '7rem'

const cellHeaderCheckbox = css`
  width: ${checkBoxWidth};
`

const cellHeaderId = css`
  width: ${idWidth};
`

const cellHeaderAmount = css`
  && {
    width: ${amountWidth};
    text-align: right;
  }
`

const cellHeaderDescription = css`
  width: 100%;
`

const table = css`
  table-layout: fixed;
`

const cellAmount = css`
  && {
    text-align: right;
  }
`

export {
  cellHeaderDescription,
  cellHeaderCheckbox,
  table,
  cellHeaderAmount,
  cellHeaderId,
  cellAmount
}
