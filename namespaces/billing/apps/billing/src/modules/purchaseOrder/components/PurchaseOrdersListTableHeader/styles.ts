import { css } from 'styled-components'

const companyCellWidth = '100%'
const numberCellWidth = '9rem'
const thresholdCellWidth = '5rem'

const baseCellStyle = `
  padding: .5rem 1rem;
`

const companyCell = css`
  && {
    ${baseCellStyle}

    width: ${companyCellWidth};
  }
`

const numberCell = css`
  && {
    ${baseCellStyle}

    width: ${numberCellWidth};
  }
`

const amountCell = css`
  && {
    ${baseCellStyle}

    width: ${numberCellWidth};
    text-align: right;
  }
`

const thresholdCell = css`
  && {
    ${baseCellStyle}

    width: ${thresholdCellWidth};
  }
`

export { companyCell, numberCell, amountCell, thresholdCell }
