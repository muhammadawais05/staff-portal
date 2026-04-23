import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { ActionLoader } from '@staff-portal/ui'
import {
  ExpireEngagementItem,
  RestoreCancelledEngagementButton,
  RestoreRejectedEngagementButton
} from '@staff-portal/engagements'
import { EngagementFragment } from '@staff-portal/engagements-interviews'

import EngagementMoreActionsDropdown from '../EngagementMoreActionsDropdown'
import RestoreExpiredEngagementButton from '../RestoreExpiredEngagementButton'
import PostponeExpirationButton from '../PostponeExpirationButton'

type Props = {
  engagement?: Maybe<EngagementFragment>
}

const EngagementActions = ({ engagement }: Props) => {
  if (!engagement) {
    return (
      <>
        <ActionLoader />
        <ActionLoader />
        <ActionLoader circular />
      </>
    )
  }

  const {
    id,
    operations: {
      restoreRejectedEngagement,
      restoreCancelledEngagement,
      restoreExpiredEngagement,
      expireEngagement,
      postponeEngagementExpiration
    }
  } = engagement

  return (
    <>
      <RestoreExpiredEngagementButton
        engagementId={id}
        operation={restoreExpiredEngagement}
      />
      <RestoreRejectedEngagementButton
        engagementId={id}
        operation={restoreRejectedEngagement}
      />
      <RestoreCancelledEngagementButton
        engagementId={id}
        operation={restoreCancelledEngagement}
      />
      <PostponeExpirationButton
        engagementId={id}
        operation={postponeEngagementExpiration}
      />
      <ExpireEngagementItem
        engagementId={id}
        initialOperation={expireEngagement}
        componentType='button'
      />
      <EngagementMoreActionsDropdown engagement={engagement} />
    </>
  )
}

export default EngagementActions
