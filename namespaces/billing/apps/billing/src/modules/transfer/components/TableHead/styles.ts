import { css } from 'styled-components'

const statusWidth = '5.4rem'
const dateWidth = '7.2rem'
const paymentWidth = '11rem'
const amountWidth = '8rem'

const status = css`
  && {
    width: ${statusWidth};
  }
`

const date = css`
  && {
    width: ${dateWidth};
  }
`

const payment = css`
  && {
    width: ${paymentWidth};
  }
`

const amount = css`
  && {
    width: ${amountWidth};
    text-align: right;
  }
`

const details = css`
  && {
    width: 100%;
  }
`

export { status, date, payment, amount, details }
