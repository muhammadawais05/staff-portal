import { css } from 'styled-components'

const baseCellStyle = `
  line-height: 1.15rem;
  vertical-align: top;
  padding: 0.75rem 1rem;
`

const dateWidth = '8rem'

const row = (removed: boolean) => css`
  opacity: ${removed ? '.5' : '1'};
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

const service = css`
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

    width: ${dateWidth};
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
  }
`

export { row, id, status, service, amount, date, description, action }
