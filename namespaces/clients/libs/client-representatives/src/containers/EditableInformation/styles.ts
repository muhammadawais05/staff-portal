import { css } from 'styled-components'

// white-space preserves line breaks when rendering Information
// !important is to override DetailedListItem weight='semibold'
export const information = css`
  white-space: pre-wrap;
  font-weight: 400 !important;
`

export const editableInfoContainer = css`
  flex-grow: 1;
  line-break: anywhere;
`
