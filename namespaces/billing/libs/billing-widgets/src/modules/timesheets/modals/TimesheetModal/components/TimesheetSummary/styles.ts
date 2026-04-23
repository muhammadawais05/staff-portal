import { css } from 'styled-components'

const gridItem = css`
  && {
    padding: 0.5rem 1rem;
  }
`

const inputComment = css`
  & textarea {
    font-size: 14px;
  }
`

const colSummary = css`
  && {
    flex-basis: 50%;
  }
`

const colComment = css`
  && {
    flex-basis: 50%;
  }
`

export { gridItem, inputComment, colComment, colSummary }
