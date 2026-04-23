import { css } from 'styled-components'

const idWidth = '5.35rem'
const statusWidth = '4rem'
const serviceWidth = '16rem'
const amountWidth = '6rem'
const dateWidth = '5.25rem'
const actionWidth = '11.15rem'

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

const serviceCell = css`
  && {
    ${baseCellStyle}

    width: ${serviceWidth};
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

export { idCell, amountCell, statusCell, serviceCell, dateCell, action }
