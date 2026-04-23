import { css } from 'styled-components'

// TODO: remove this whén the Section collapse become managable
// https://toptal-core.atlassian.net/browse/FX-2333
export const header = css`
  > div:first-child {
    border-bottom: none;
    border-radius: 0.5rem;
  }

  > div:last-child {
    padding: 0 !important;
  }
`
