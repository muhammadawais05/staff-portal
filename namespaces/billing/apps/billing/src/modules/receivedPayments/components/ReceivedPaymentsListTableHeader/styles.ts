import { css } from 'styled-components'

const idWidth = '5.35rem'
const statusWidth = '7.4rem'
const recipientWidth = '7.7rem'
const amountWidth = '6rem'
const dateWidth = '7.25rem'
const actionWidth = '5.2rem'

const baseCellStyle = `
  padding: 0.5rem 1rem;
`

const id = css`
  && {
    ${baseCellStyle}

    width: ${idWidth};
  }
`

const status = css`
  && {
    ${baseCellStyle}

    width: ${statusWidth};
  }
`

const recipient = css`
  && {
    ${baseCellStyle}

    width: ${recipientWidth};
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

const description = css`
  && {
    ${baseCellStyle}

    width: 100%;
  }
`

const action = css`
  && {
    ${baseCellStyle}

    text-align: right;
    width: ${actionWidth};
  }
`

export { id, status, recipient, amount, date, description, action }
