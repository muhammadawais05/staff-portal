import { css } from 'styled-components'

const descriptionWidth = '100%'
const payeeWidth = '10rem'
const amountWidth = '6rem'
const dateWidth = '7.25rem'

const baseCellStyle = `
  padding: .5rem 1rem;
`

const descriptionCell = css`
  && {
    ${baseCellStyle}

    width: ${descriptionWidth};
  }
`

const amountCell = css`
  && {
    ${baseCellStyle}

    text-align: right;
    width: ${amountWidth};
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

export { amountCell, descriptionCell, payeeCell, dateCell }
