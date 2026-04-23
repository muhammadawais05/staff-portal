import { css } from 'styled-components'

const poLineName = '40%'
const totalWidth = '20%'
const draftedTotalWidth = '20%'

const baseCellStyle = `
  padding: .5rem 1rem;
`

const poLineNameCell = css`
  && {
    ${baseCellStyle}

    width: ${poLineName};
  }
`

const invoicedTotalCell = css`
  && {
    ${baseCellStyle}

    width: ${totalWidth};
  }
`

const draftedTotalCell = css`
  && {
    ${baseCellStyle}

    width: ${draftedTotalWidth};
  }
`

export { poLineNameCell, invoicedTotalCell, draftedTotalCell }
