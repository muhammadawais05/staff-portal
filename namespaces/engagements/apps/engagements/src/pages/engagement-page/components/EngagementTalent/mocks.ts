import {
  OperationCallableTypes,
  EngagementCommitmentEnum,
  CommitmentRateAvailability,
  BillCycle,
  CommitmentAvailability,
  AdjustedCommitment
} from '@staff-portal/graphql/staff'
import { EngagementClientInTalentSectionFragment } from '@staff-portal/engagements'
import { createEngagementClientInTalentSectionMock } from '@staff-portal/engagements/src/mocks'

import {
  EngagementTalentFragment,
  GetEngagementTalentQuery
} from './data/get-engagement-talent'

export const createCurrentCommitmentMock = (
  currentCommitment?: Partial<AdjustedCommitment>
): AdjustedCommitment => ({
  availability: CommitmentAvailability.full_time,
  adjustedCompanyRate: {
    availability: CommitmentRateAvailability.WEEK,
    value: 'some value'
  },
  adjustedRevenueRate: {
    availability: CommitmentRateAvailability.HOUR,
    value: 'some value'
  },
  adjustedTalentRate: {
    availability: CommitmentRateAvailability.WEEK,
    value: 'some value'
  },
  canBeDiscounted: false,
  ...currentCommitment
})

export type Props = Partial<{
  engagement: Partial<GetEngagementTalentQuery['node']>
  talent: Partial<EngagementTalentFragment>
  client: Partial<EngagementClientInTalentSectionFragment>
  currentCommitment: Partial<AdjustedCommitment>
  minimumHours?: number
}>

export const createEngagementTalentMock = ({
  engagement,
  talent,
  client,
  currentCommitment,
  minimumHours = 0
}: Props = {}): GetEngagementTalentQuery => ({
  experiments: {
    poLines: { enabled: false }
  },
  node: {
    id: '123',
    trialLength: 5,
    createdAt: '2018-11-03T06:10:28.160+03:00',
    billCycle: BillCycle.WEEKLY,
    commitment: EngagementCommitmentEnum.FULL_TIME,
    discountMultiplier: '0.90',
    extraHoursEnabled: false,
    interviews: {
      totalCount: 0
    },
    currentCommitment: {
      ...createCurrentCommitmentMock(currentCommitment)
    },
    purchaseOrder: {
      id: 'VjEtUHVyY2hhc2VPcmRlci0yMzI0',
      poNumber: '8502964941',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/purchase_orders/2324'
      }
    },
    onboardingPlanUrl: 'https://staging.toptal.net/platform/staff/some_url',
    operations: {
      changeEngagementTrialLength: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      assignEngagementPurchaseOrder: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateEngagementExtraHoursEnabled: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      editEngagementCommitment: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    talent: {
      id: '456',
      type: 'some type',
      fullName: 'Paul Smith',
      email: 'some@email.com',
      profileLink: {
        url: 'https://test.com',
        newTab: false
      },
      additionalSkypeIds: {
        nodes: []
      },
      contacts: { nodes: [] },
      ...talent
    },
    client: {
      ...createEngagementClientInTalentSectionMock(client)
    },
    commitmentSettings: {
      id: 'test-id',
      minimumHours
    },
    ...engagement
  }
})
