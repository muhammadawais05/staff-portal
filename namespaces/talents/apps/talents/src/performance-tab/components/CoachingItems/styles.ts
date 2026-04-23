import { palette } from '@toptal/picasso/utils'
import { STAFF_PORTAL_BACKGROUND_COLOR } from '@staff-portal/ui'

export const container = `
  & div[class*="PicassoSection-root"] {
    background-color: ${STAFF_PORTAL_BACKGROUND_COLOR};
    border: none;
    padding: 0;
  }
`

export const coachingItemWrapper = `
  padding-bottom: 1rem;
  border-bottom: 1px ${palette.grey.lighter} solid;
`
