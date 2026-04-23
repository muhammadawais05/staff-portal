import {
  BillCycle,
  CommitmentAvailability,
  EngagementCommitmentEnum,
  OperationCallableTypes,
  CommitmentRateAvailability
} from '@staff-portal/graphql/staff'
import { createEngagementClientInTalentSectionMock } from '@staff-portal/engagements/src/mocks'

import { GetHiredTalentContentQuery } from './get-hired-talent-content.staff.gql.types'

export type Props = {
  engagement?: Partial<GetHiredTalentContentQuery['node']>
}

export const createEngagementHiredTalentMock = ({
  engagement
}: Props = {}): GetHiredTalentContentQuery => ({
  node: {
    id: '123',
    client: createEngagementClientInTalentSectionMock(),
    talent: {
      id: '456',
      type: 'some type',
      fullName: 'Paul Smith',
      resumeUrl: 'www.resume.com',
      webResource: {
        text: 'Web Resource Text'
      },
      photo: {
        default: './photo.png'
      }
    },
    currentCommitment: {
      availability: CommitmentAvailability.hourly,
      adjustedCompanyRate: {
        value: '10',
        availability: CommitmentRateAvailability.HOUR,
        hourlyHint: {
          value: '20'
        }
      },
      adjustedTalentRate: {
        value: '10',
        availability: CommitmentRateAvailability.HOUR,
        hourlyHint: {
          value: '20'
        }
      },
      adjustedRevenueRate: {
        value: '10',
        availability: CommitmentRateAvailability.HOUR,
        hourlyHint: {
          value: '20'
        }
      },
      canBeDiscounted: true
    },
    extraHoursEnabled: true,
    commitmentSettings: {
      id: '999',
      minimumHours: 10
    },
    billingCycles: {
      nodes: [
        {
          id: '11',
          startDate: '2020-04-15',
          endDate: '2020-04-30'
        }
      ]
    },
    startDate: '2028-11-03',
    trialLength: 22,
    weeklyHours: 8,
    billCycle: BillCycle.WEEKLY,
    commitment: EngagementCommitmentEnum.FULL_TIME,
    discountMultiplier: '1',
    operations: {
      changeEngagementTrialLength: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateEngagementExtraHoursEnabled: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateEngagementWeeklyHours: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      editEngagementCommitment: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    ...engagement
  },
  viewer: {
    maxEngagementTrialLength: 15
  }
})
