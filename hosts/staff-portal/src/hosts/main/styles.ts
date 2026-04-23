import { createGlobalStyle } from 'styled-components'

// Prevent x-axis overflow (copied from talent-portal-frontend and topteam),
// see discussion here:
// https://toptal-core.slack.com/archives/CERF5NHT3/p1571221419132700
export const GlobalStyle = createGlobalStyle`
  #root {
    max-width: 100%;

    > div {
      max-width: 100%;
    }
  }
`
