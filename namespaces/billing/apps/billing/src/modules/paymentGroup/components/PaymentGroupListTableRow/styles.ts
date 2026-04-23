import { css } from 'styled-components'

const baseCellStyle = `
  line-height: 1.15rem;
  vertical-align: top;
  padding: 0.75rem 1rem;
`

const amountCell = css`
  && {
    ${baseCellStyle}

    text-align: right;
  }
`
const dateCell = css`
  && {
    ${baseCellStyle}

    text-align: left;
  }
`

const action = css`
  && {
    ${baseCellStyle}

    vertical-align: top;
  }
`

export { amountCell, dateCell, action }
