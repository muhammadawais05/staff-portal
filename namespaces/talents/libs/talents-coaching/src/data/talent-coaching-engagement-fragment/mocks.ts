import {
  TalentCoachingEngagementCampaignSlug,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { TalentCoachingEngagementFragment } from './talent-coaching-engagement-fragment.staff.gql.types'
import { createTalentForCoachingEngagementFragmentMock } from '../talent-for-coaching-engagement-fragment/mocks'

export const createTalentCoachingEngagementFragmentMock = (
  fields?: Partial<TalentCoachingEngagementFragment>
) => ({
  id: encodeEntityId('1000', 'Test'),
  claimedAt: '2021-03-24T09:00:32+03:00' as const,
  createdAt: '2021-03-23T09:00:32+03:00' as const,
  updatedAt: '2021-03-25T09:00:32+03:00' as const,
  campaignSlug: TalentCoachingEngagementCampaignSlug.NEWCOMERS,
  status: TalentCoachingEngagementStatus.PENDING_COACH_REVIEW,
  states: {
    nodes: []
  },
  coach: {
    id: 'test-id',
    fullName: 'Juan Sanchez',
    webResource: {
      text: 'Juan Sanchez',
      url: 'https://staging.toptal.net/platform/staff/staff/498468',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  operations: {
    addCoachActionsNote: createOperationMock(),
    addGeneralNote: createOperationMock(),
    assignCoach: createOperationMock(),
    changeStatus: createOperationMock(),
    __typename: 'TalentCoachingEngagementOperations'
  },
  talent: createTalentForCoachingEngagementFragmentMock(),
  applicationStatus: {
    id: 'test-id',
    totalInterviewCount: 6,
    cancelledInterviewCount: 1,
    rejectedInterviewCount: 2,
    successfulInterviewCount: 3,
    totalAvailabilityRequestCount: 2,
    confirmedAvailabilityRequestCount: 1,
    statusRetentionDays: 30,
    totalEngagementCount: 4,
    totalJobApplicationCount: 5
  },
  __typename: 'TalentCoachingEngagement',
  ...fields
})
