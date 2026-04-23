import { css } from 'styled-components'

const idWidth = '5.35rem'
const statusWidth = '8rem'
const payeeWidth = '100%'
const amountWidth = '6rem'
const dateWidth = '7.25rem'
const actionWidth = '4rem'

const baseCellStyle = `
  padding: .5rem 1rem;
`

const idCell = css`
  && {
    ${baseCellStyle}

    width: ${idWidth};
  }
`

const amountCell = css`
  && {
    ${baseCellStyle}

    text-align: right;
    width: ${amountWidth};
  }
`

const statusCell = css`
  && {
    ${baseCellStyle}

    width: ${statusWidth};
  }
`

const payeeCell = css`
  && {
    ${baseCellStyle}

    width: ${payeeWidth};
  }
`

const dateCell = css`
  && {
    ${baseCellStyle}

    width: ${dateWidth};
  }
`

const action = css`
  && {
    ${baseCellStyle}

    width: ${actionWidth};
  }
`

export { idCell, amountCell, statusCell, payeeCell, dateCell, action }
