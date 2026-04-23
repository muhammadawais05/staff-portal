import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  JobCommitment,
  TalentAllocatedHoursAvailability
} from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

export const getAvailabilityStepTalentAvailabilityDataResponse = () => ({
  data: {
    newEngagementWizard: {
      talent: {
        id: encodeEntityId('123', 'Talent'),
        associatedRoles: {
          nodes: [],
          __typename: 'RoleOrClientConnection'
        },
        operations: {
          updateTalentAllocatedHours: hiddenOperationMock(),
          __typename: 'TalentOperations'
        },
        endingEngagements: {
          nodes: [],
          __typename: 'EndingEngagementConnection'
        },
        type: 'Designer',
        roleTitle: 'Designer',
        allocatedHoursAvailability: TalentAllocatedHoursAvailability.PART_TIME,
        allocatedHoursAvailabilityIncludingEndingEngagements:
          TalentAllocatedHoursAvailability.PART_TIME,
        availableHours: 15,
        availableHoursIncludingEndingEngagements: 15,
        allocatedHours: 75,
        allocatedHoursConfirmedAt: '2022-03-05T09:32:55+03:00',
        preliminarySearchSetting: {
          enabled: true,
          __typename: 'TalentPreliminarySearchSetting'
        },
        unavailableAllocatedHoursChangeRequest: null,
        __typename: 'Talent'
      },
      job: {
        id: encodeEntityId('123', 'Job'),
        commitment: JobCommitment.FULL_TIME,
        expectedWeeklyHours: null,
        expectedWeeklyHoursWithDefault: 40,
        __typename: 'Job'
      },
      talentCalendarAvailability: [
        {
          date: '2022-04-18',
          slotsCount: 25,
          __typename: 'TimeSlotsPerDay'
        }
      ],
      __typename: 'NewEngagementWizard'
    }
  }
})
