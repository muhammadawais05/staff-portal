import { css } from 'styled-components'

const emailHeader = css`
  width: 24rem;
`

const statusHeader = css`
  width: 20%;
`

const messageHeader = css`
  width: calc(100% - 24rem - 20%);
`

const table = css`
  table-layout: fixed;
`

export { emailHeader, table, statusHeader, messageHeader }
