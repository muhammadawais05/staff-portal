import React from 'react'
import { LEGACY_STAFF_PORTAL_URL } from '@staff-portal/config'
import { useDependency } from '@staff-portal/dependency-injector'

import { RECENT_ACTIVITY_BUTTON } from '../../../../dependencies'

interface Props {
  gid: string
  type: 'invoices' | 'payment_groups' | 'payments'
  content: string
}

const getFullHistoryUrl = (gid: string, type: Props['type']) =>
  `${LEGACY_STAFF_PORTAL_URL}/${type}/${gid
    .split('/')
    .pop()}/performed_actions?comments=true`

const BillingRecentActivityButton = ({ gid, type, content }: Props) => {
  const fullHistoryUrl = getFullHistoryUrl(gid, type)
  const RecentActivityButton = useDependency(RECENT_ACTIVITY_BUTTON)

  return RecentActivityButton ? (
    <RecentActivityButton feeds={[[gid]]} fullHistoryUrl={fullHistoryUrl}>
      {content}
    </RecentActivityButton>
  ) : (
    <>content</>
  )
}

export default BillingRecentActivityButton
