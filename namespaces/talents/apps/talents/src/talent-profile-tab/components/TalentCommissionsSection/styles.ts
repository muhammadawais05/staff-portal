import { css } from 'styled-components'

// Necessary override because of the billing CommissionsWidget
export const commissionsWidgetSection = css`
  > div:last-child {
    padding-top: 0 !important;
  }
`
