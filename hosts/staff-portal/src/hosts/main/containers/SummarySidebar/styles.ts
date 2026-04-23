import { css } from 'styled-components'
import { palette } from '@toptal/picasso/utils'
import { STAFF_PORTAL_BACKGROUND_COLOR } from '@staff-portal/ui'

export const root = css`
  width: 16rem;
  flex-shrink: 0;
  background-color: ${STAFF_PORTAL_BACKGROUND_COLOR};
  padding-top: 0.5rem;
  border-left: 1px solid ${palette.grey.lighter};
`
