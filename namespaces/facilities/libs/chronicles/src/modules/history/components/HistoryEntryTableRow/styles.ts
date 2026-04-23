import { css } from 'styled-components'

export const mainRow = css`
  && {
    border-bottom-color: transparent;
  }
`

export const dateCell = css`
  && {
    vertical-align: top;
    width: 12.5rem;
  }
`

export const contentCell = css`
  && {
    word-break: break-word;
  }
`

export const actionCell = css`
  && {
    width: 1.5rem;
    margin: 0;
    padding: 0 1rem 0 0;
  }
`

export const commentCell = css`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 1rem;

  &:last-child {
    padding-right: 0;
  }
`

export const comment = css`
  padding-left: 1.5rem;
`
