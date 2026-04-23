import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'

import { RelationshipStatus } from '../../enums'

const getRelationshipTextMapping = (
  talentProfileLinkElement: ReactNode
): Record<RelationshipStatus, ReactNode> => ({
  [RelationshipStatus.TalentRejectedAfterInterview]: (
    <>
      {talentProfileLinkElement} was{' '}
      <Typography color='red' as='span'>
        rejected
      </Typography>{' '}
      after an interview for
    </>
  ),
  [RelationshipStatus.TalentRejectedBeforeInterview]: (
    <>
      {talentProfileLinkElement} was{' '}
      <Typography color='red' as='span'>
        rejected
      </Typography>{' '}
      before an interview for
    </>
  ),
  [RelationshipStatus.EngagementCancelledAfterInterview]: (
    <>Client and {talentProfileLinkElement} had a cancelled engagement for</>
  ),
  [RelationshipStatus.EngagementCancelledBeforeInterview]: (
    <>Client and {talentProfileLinkElement} did not have an interview for</>
  ),
  [RelationshipStatus.EngagementSuccessful]: (
    <>
      Client and {talentProfileLinkElement}{' '}
      <Typography color='green' as='span'>
        worked together
      </Typography>{' '}
      for
    </>
  ),
  [RelationshipStatus.TalentRejectedAfterTrial]: (
    <>
      Client and {talentProfileLinkElement} had a{' '}
      <Typography color='red' as='span'>
        failed trial
      </Typography>{' '}
      during
    </>
  ),
  [RelationshipStatus.TalentWasPreviouslyIntroduced]: (
    <>{talentProfileLinkElement} was already introduced to the client for</>
  )
})

export default getRelationshipTextMapping
