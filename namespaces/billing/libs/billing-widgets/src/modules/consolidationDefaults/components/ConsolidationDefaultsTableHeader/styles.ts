import { css } from 'styled-components'

// TODO: remove these styles after https://toptal-core.atlassian.net/browse/SPB-2178
const nameWidth = '25.35rem'
const creationWidth = '9.35rem'
const statusWidth = '16rem'

const nameCell = css`
  && {
    width: ${nameWidth};
  }
`

const creationCell = css`
  && {
    width: ${creationWidth};
  }
`

const statusCell = css`
  && {
    width: ${statusWidth};
  }
`

export { nameCell, creationCell, statusCell }
