import { css } from 'styled-components'

const baseCellStyle = `
  line-height: 1.15rem;
  vertical-align: top;
  padding: 0.75rem 1rem;
`

const id = css`
  && {
    ${baseCellStyle}
  }
`

const balance = css`
  && {
    ${baseCellStyle}
  }
`

const receiver = css`
  && {
    ${baseCellStyle}
  }
`

const amount = css`
  && {
    text-align: right;
    ${baseCellStyle}
  }
`

const date = css`
  && {
    ${baseCellStyle}
  }
`

const details = css`
  && {
    ${baseCellStyle}
  }
`

const action = css`
  && {
    ${baseCellStyle}

    vertical-align: top;
  }
`

export { id, balance, receiver, amount, date, details, action }
