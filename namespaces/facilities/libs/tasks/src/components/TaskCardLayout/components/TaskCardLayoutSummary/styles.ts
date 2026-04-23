import { css } from 'styled-components'

export const overviewBlockWrapper = css`
  section > div {
    padding: 0;
    overflow: hidden;
  }

  section > div > div {
    min-width: auto;
    width: 25%;
    align-items: normal;
  }

  p + p {
    font-size: 0.875rem;
    overflow: hidden;
    width: 100%;
  }
`
