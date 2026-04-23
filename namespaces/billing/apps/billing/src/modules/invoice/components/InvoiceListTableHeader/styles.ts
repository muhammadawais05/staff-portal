import { css } from 'styled-components'

const actionWidth = '5.2rem'
const amountWidth = '9rem'
const checkboxWidth = '1rem'
const dateWidth = '8.95rem'
const expanderWidth = '3.4rem'
const idWidth = '5.35rem'
const recipientWidth = '5.7rem'
const statusWidth = '8.2rem'

const baseCellStyle = css`
  padding: 0.5rem 1rem;
`

const id = css`
  && {
    width: ${idWidth};
    ${baseCellStyle}
  }
`

const checkbox = css`
  && {
    width: ${checkboxWidth};
    ${baseCellStyle}
  }
`

const status = css`
  && {
    width: ${statusWidth};
    ${baseCellStyle}
  }
`

const recipient = css`
  && {
    width: ${recipientWidth};
    ${baseCellStyle}
  }
`

const amount = css`
  && {
    width: ${amountWidth};
    text-align: right;
    ${baseCellStyle}
  }
`

const date = css`
  && {
    width: ${dateWidth};
    ${baseCellStyle}
  }
`

const description = css`
  && {
    width: 100%;
    ${baseCellStyle}
  }
`

const action = css`
  && {
    text-align: right;
    width: ${actionWidth};
    ${baseCellStyle}
  }
`

const expander = css`
  && {
    width: ${expanderWidth};
    ${baseCellStyle}
  }
`

export {
  action,
  amount,
  checkbox,
  date,
  description,
  expander,
  id,
  recipient,
  status
}
