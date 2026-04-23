import React, { useMemo } from 'react'
import { MoreButton } from '@staff-portal/ui'
import {
  ExpireEngagementItem,
  CancelInterviewMenuItem
} from '@staff-portal/engagements'
import { checkIfAllOperationsAreHidden } from '@staff-portal/operations'

import { ClientJobEngagementFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  engagement: ClientJobEngagementFragment
}

const EngagementActionButton = ({ engagement }: Props) => {
  const { operations } = engagement

  const isAllOperationsAreHidden = useMemo(
    () => checkIfAllOperationsAreHidden(operations),
    [operations]
  )

  return (
    <MoreButton hidden={isAllOperationsAreHidden} fullHeight disablePopper>
      <ExpireEngagementItem
        engagementId={engagement.id}
        componentType='menu-item'
        initialOperation={operations?.expireEngagement}
      />
      <CancelInterviewMenuItem
        engagementId={engagement.id}
        operation={operations?.cancelEngagementInInterview}
      />
    </MoreButton>
  )
}

export default EngagementActionButton
