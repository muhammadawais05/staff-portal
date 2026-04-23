import { css } from 'styled-components'

export const candidateCell = css`
  max-width: 5rem;
`

export const candidateContent = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

export const candidateName = css`
  &:not(:first-child) {
    margin-left: 0.5rem;
  }
`
