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

const status = css`
  && {
    ${baseCellStyle}
  }
`

const recipient = css`
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

const description = css`
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

export { id, status, recipient, amount, date, description, action }
