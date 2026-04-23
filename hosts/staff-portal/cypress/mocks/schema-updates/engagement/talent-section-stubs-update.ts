import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  CommitmentAvailability,
  CommitmentRateAvailability,
  EngagementCommitmentEnum,
  Talent
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { EngagementWithExperiment } from '~integration/mocks/responses/engagement'
import { successMutationMock } from '~integration/mocks/mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getEditPurchaseOrderDataResponse,
  getEngagementTalentSectionOperationsResponse
} from '~integration/mocks/responses'

const updateTalentSectionStubs = ({
  engagement
}: Partial<{
  engagement: Partial<EngagementWithExperiment>
  jobNode: {}
}> = {}) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      commitmentSettings: {
        id: encodeEntityId('1', 'CommitmentSettings'),
        minimumHours: 40
      },
      commitment: EngagementCommitmentEnum.HOURLY,
      currentCommitment: {
        availability: CommitmentAvailability.full_time,
        adjustedCompanyRate: {
          availability: CommitmentRateAvailability.WEEK,
          value: '10.00',
          hourlyHint: null
        },
        adjustedRevenueRate: {
          availability: CommitmentRateAvailability.HOUR,
          value: '10.00',
          hourlyHint: null
        },
        adjustedTalentRate: {
          availability: CommitmentRateAvailability.WEEK,
          value: '10.00',
          hourlyHint: null
        },
        canBeDiscounted: false
      },
      extraHoursEnabled: true,
      trialLength: 1,
      operations: getEngagementOperations({
        changeEngagementTrialLength: enabledOperationMock(),
        updateEngagementExtraHoursEnabled: enabledOperationMock(),
        assignEngagementPurchaseOrder: enabledOperationMock(),
        assignEngagementPurchaseOrderLine: enabledOperationMock(),
        editEngagementCommitment: enabledOperationMock()
      }),
      talent: {
        contacts: {
          nodes: [
            {
              id: 'VjEtQ29udGFjdC0zMzYwNjg4',
              type: 'PHONE',
              value: '+8801716991168',
              __typename: 'Contact'
            },
            {
              id: 'VjEtQ29udGFjdC1za3lwZSNjaHJpc3RpbmVfc3RldWJlcjI4MzI5NDQ',
              type: 'SKYPE',
              value: 'christine_steuber2832944',
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        ...engagement?.talent
      } as Talent,
      ...engagement
    }),
    GetEngagementTrialLength: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          startDate: null,
          trialLength: 1
        }
      }
    },
    GetLazyOperation: getEngagementTalentSectionOperationsResponse(),
    GetEditPurchaseOrderData: getEditPurchaseOrderDataResponse(),
    ChangeEngagementTrialLength: {
      data: {
        changeEngagementTrialLength: successMutationMock()
      }
    },
    EditEngagementCommitment: {
      data: {
        editEngagementCommitment: successMutationMock()
      }
    },
    AssignEngagementPurchaseOrderLine: {
      data: {
        assignEngagementPurchaseOrderLine: successMutationMock()
      }
    },
    GetEngagementTalentExtraHoursEnabled: {
      data: {
        changeEngagementTrialLength: successMutationMock()
      }
    },
    AssignEngagementPurchaseOrder: {
      data: {
        assignEngagementPurchaseOrder: successMutationMock()
      }
    },
    CallContact: {
      data: {
        callContact: successMutationMock({
          externalCallUrl: '/engagements/911',
          __typename: 'CallContactPayload'
        })
      }
    }
  })

export default updateTalentSectionStubs
