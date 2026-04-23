import { css } from 'styled-components'

const idWidth = '3rem'
const titleWidth = '8rem'
const statusWidth = '5rem'

const headerCellId = css`
  && {
    width: ${idWidth};
  }
`

const headerCellTitle = css`
  && {
    width: ${titleWidth};
  }
`

const headerCellStatus = css`
  && {
    width: ${statusWidth};
  }
`

export { headerCellId, headerCellTitle, headerCellStatus }
