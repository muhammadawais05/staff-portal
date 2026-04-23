import { css } from 'styled-components'

const idWidth = '5.35rem'
const balanceWidth = '4.4rem'
const receiverWidth = '7.7rem'
const amountWidth = '6rem'
const dateWidth = '7.25rem'
const actionWidth = '4rem'

const baseCellStyle = `
  padding: 0.5rem 1rem;
`

const id = css`
  && {
    ${baseCellStyle}

    width: ${idWidth};
  }
`

const balance = css`
  && {
    ${baseCellStyle}

    width: ${balanceWidth};
  }
`

const receiver = css`
  && {
    ${baseCellStyle}

    width: ${receiverWidth};
  }
`

const amount = css`
  && {
    ${baseCellStyle}

    width: ${amountWidth};
    text-align: right;
  }
`

const date = css`
  && {
    ${baseCellStyle}

    width: ${dateWidth};
  }
`

const details = css`
  && {
    ${baseCellStyle}

    width: 100%;
  }
`

const action = css`
  && {
    ${baseCellStyle}

    width: ${actionWidth};
  }
`

export { id, balance, receiver, amount, date, details, action }
