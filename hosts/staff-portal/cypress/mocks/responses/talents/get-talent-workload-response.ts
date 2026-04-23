import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'

export const getTalentWorkloadResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      averageWorkingHours: 0,
      workingPeriods: {
        nodes: [
          {
            start: '2022-01-10',
            stop: '2022-01-16',
            workingHours: 0,
            activeEngagements: {
              edges: [],
              __typename: 'WorkingPeriodEngagementsEdgedConnection'
            },
            __typename: 'TalentWorkingPeriod'
          }
        ],
        __typename: 'TalentWorkingPeriodConnection'
      },
      engagements: {
        nodes: [],
        __typename: 'TalentEngagementConnection'
      },
      type: 'Developer',
      allocatedHoursAvailability: 'UNAVAILABLE',
      allocatedHoursAvailabilityIncludingEndingEngagements: 'UNAVAILABLE',
      availableHours: 0,
      availableHoursIncludingEndingEngagements: 0,
      allocatedHours: 0,
      allocatedHoursConfirmedAt: null,
      preliminarySearchSetting: {
        enabled: true,
        __typename: 'TalentPreliminarySearchSetting'
      },
      endingEngagements: {
        nodes: [],
        __typename: 'EndingEngagementConnection'
      },
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      operations: getTalentOperations({
        updateTalentAllocatedHours: enabledOperationMock()
      }),
      ...talent,
      __typename: 'Talent'
    }
  }
})
