import { css } from 'styled-components'

export const startedByCell = css`
  max-width: 10rem;

  > * {
    max-width: 100%;
    display: inline-flex;
  }

  a {
    max-width: 100%;
  }
`

// TODO: to be removed when there is a better way to set spacing for disabled buttons
export const buttonContainer = css`
  > * + * {
    margin-left: 1rem;
  }
`
