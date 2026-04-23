import {
  Staff,
  TalentCoachingEngagement,
  TalentCoachingEngagementCampaignSlug,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '~integration/mocks'
import { talentNodeMock } from '~integration/mocks/fragments/talent-node-mock'
import { timeZoneMock } from '~integration/mocks/fragments/time-zone-mock'
import { webResourceMock } from '~integration/mocks/fragments/web-resource-mock'

export const getTalentCoachingEngagementMock = (
  coachingEngagement?: Partial<TalentCoachingEngagement>
): TalentCoachingEngagement =>
  ({
    __typename: 'TalentCoachingEngagement',
    id: encodeEntityId('123', 'TalentCoachingEngagement'),
    claimedAt: '2022-01-01T00:00:00+03:00',
    createdAt: '2022-01-01T00:00:00+03:00',
    updatedAt: '2022-01-01T00:00:00+03:00',
    campaignSlug: TalentCoachingEngagementCampaignSlug.NEWCOMERS,
    status: TalentCoachingEngagementStatus.PENDING_CLAIM,
    ...coachingEngagement,
    states: {
      __typename: 'TalentCoachingEngagementStateConnection',
      nodes: [],
      totalCount: 0,
      ...coachingEngagement?.states
    },
    talent: talentNodeMock({
      activatedAt: '2022-01-01T00:00:00+03:00',
      photo: null,
      hourlyRate: '0.0',
      timeZone: timeZoneMock(),
      locationV2: null,
      talentPartner: null,
      ...coachingEngagement?.talent
    }).node(),
    coach: {
      id: encodeEntityId('123', 'Staff'),
      fullName: 'Timofei Kachalov',
      ...webResourceMock({
        text: 'Timofei Kachalov'
      }),
      ...coachingEngagement?.coach
    } as Staff,
    operations: {
      __typename: 'TalentCoachingEngagementOperations',
      addCoachActionsNote: hiddenOperationMock(),
      addGeneralNote: hiddenOperationMock(),
      assignCoach: hiddenOperationMock(),
      changeStatus: hiddenOperationMock(),
      ...coachingEngagement?.operations
    },
    applicationStatus: {
      __typename: 'ApplicationStatus',
      id: encodeEntityId('123', 'ApplicationStatus'),
      cancelledInterviewCount: 0,
      confirmedAvailabilityRequestCount: 0,
      rejectedInterviewCount: 0,
      statusRetentionDays: 0,
      successfulInterviewCount: 0,
      totalAvailabilityRequestCount: 0,
      totalEngagementCount: 0,
      totalInterviewCount: 0,
      totalJobApplicationCount: 0,
      ...coachingEngagement?.applicationStatus
    },
    notes: {
      __typename: 'NoteConnection',
      nodes: [],
      totalCount: 0,
      operations: {
        createNote: hiddenOperationMock()
      },
      ...coachingEngagement?.notes
    },
    tasks: {
      __typename: 'TalentCoachingEngagementTaskConnection',
      nodes: [],
      totalCount: 0,
      ...coachingEngagement?.tasks
    }
  } as TalentCoachingEngagement)
