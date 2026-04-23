import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const baseCellStyle = `
  line-height: 1.15rem;
  vertical-align: top;
  padding: 0.75rem 1rem;
`

const row = css`
  && {
    background-color: ${palette.grey.lighter};

    p,
    a,
    span,
    svg {
      color: ${palette.grey.main};
    }
  }
`

const id = css`
  && {
    ${baseCellStyle}
  }
`

const checkbox = css`
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

const status = css`
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

const description = css`
  && {
    ${baseCellStyle}
  }
`

export { action, id, amount, date, description, status, checkbox, row }
