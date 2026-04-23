import { css } from 'styled-components'

// Because of 1.5em from Picasso. EM units with Picasso Container font-size: 0.8125rem
// creates row with height equals to 19.5px what prevents it from a propper vertical allignment with adjacent icon.
// No other way to fix it except to change EM units to REM in Picasso, but since these are global styles
// it's not easy to do it without breaking something
export const common = css`
  vertical-align: top;
  padding-top: 0.625rem;

  span,
  p {
    line-height: 1.25rem;
  }
`

export const title = css`
  ${common}
  width: 9.2rem;
  max-width: 9.2rem;
  flex-direction: column;
`

export const company = css`
  ${common}
  width: 7rem;
  max-width: 7rem;
`

export const matcher = css`
  ${common}
  width: 6.2rem;
  max-width: 6.2rem;
`

export const status = css`
  ${common}
  width: 5.2rem;
  max-width: 5.2rem;
`
export const handoffIcon = css`
  margin-right: 0.25rem;
  margin-top: 0.125rem;
`

export const commitmentIcon = css`
  margin-left: 0.25rem;
  margin-top: 0.125rem;
`

export const slackButton = css`
  background-color: transparent;
  margin-left: 0.313rem;
  margin-top: -0.125rem;
`

export const arrow = css`
  ${common}
  width: 2rem;
  max-width: 2rem;
  padding-top: 0.45rem;
  padding-right: 1rem !important;
`

export const postDate = css`
  ${common}
  width: 5rem;
  max-width: 5rem;
`

export const contacts = css`
  ${common}
  width: 5.4rem;
  max-width: 5.4rem;
`

export const webResource = css`
  margin-right: 0.313rem;
  word-break: break-word;
  flex: 1;
  min-width: 0;
`
