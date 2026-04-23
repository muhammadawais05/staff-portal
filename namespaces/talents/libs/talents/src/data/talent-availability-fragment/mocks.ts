import {
  EngagementCommitmentEnum,
  TalentAllocatedHoursAvailability
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { TalentAvailabilityFragment } from './talent-availability-fragment.staff.gql.types'

type EndingEngagements = ArrayItem<
  NonNullable<TalentAvailabilityFragment['endingEngagements']>['nodes']
>

export const createTalentAvailabilityFragmentMock = (
  talentAvailability: Partial<TalentAvailabilityFragment> = {}
): TalentAvailabilityFragment => ({
  id: encodeEntityId('1000', 'Test'),
  type: 'Developer',
  roleTitle: 'Developer',
  allocatedHoursAvailability: TalentAllocatedHoursAvailability.UNAVAILABLE,
  allocatedHoursAvailabilityIncludingEndingEngagements:
    TalentAllocatedHoursAvailability.UNAVAILABLE,
  availableHours: 0,
  availableHoursIncludingEndingEngagements: 0,
  allocatedHours: 0,
  allocatedHoursConfirmedAt: null,
  unavailableAllocatedHoursChangeRequest: null,
  endingEngagements: {
    nodes: []
  },
  ...talentAvailability
})

export const createEndingEngagementMock = (
  endingEngagement: Partial<EndingEngagements> = {}
): EndingEngagements => ({
  id: encodeEntityId('1000', 'Test'),
  commitment: EngagementCommitmentEnum.FULL_TIME,
  endDate: '2022-01-10',
  webResource: {
    url: 'TEST_ENGAGEMENT_LINK',
    text: 'TEST_ENGAGEMENT_NAME'
  },
  job: {
    id: '123',
    claimer: {
      id: '123',
      fullName: 'TEST_CLAIMER_NAME',
      webResource: { url: 'TEST_CLAIMER_LINK' }
    }
  },
  ...endingEngagement
})
