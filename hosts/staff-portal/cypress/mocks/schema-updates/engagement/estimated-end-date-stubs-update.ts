import {
  Engagement,
  ProposedEngagementEndStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { getEstimatedEndDateOperationResponse } from '~integration/mocks/responses'

const updateEstimatedEndDateStubs = ({
  engagement = {}
}: {
  engagement?: Partial<Engagement>
} = {}) => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      proposedEnd: {
        id: '123',
        endDate: '2021-10-15',
        status: ProposedEngagementEndStatus.PENDING,
        ...engagement.proposedEnd
      },
      operations: getEngagementOperations({
        proposeEngagementEnd: enabledOperationMock()
      })
    }),
    GetLazyOperation: getEstimatedEndDateOperationResponse(),
    ProposeEngagementEstimateEndDate: {
      data: {
        proposeEngagementEnd: {
          success: true,
          errors: [],
          __typename: 'ProposeEngagementEndPayload',
          engagement: {
            id: encodeEntityId('123', 'Engagement'),
            proposedEnd: {
              id: 'VjEtUHJvcG9zZWRFbmdhZ2VtZW50RW5kLTEzMjgz',
              endDate: '2022-04-01',
              status: 'PENDING',
              __typename: 'ProposedEngagementEnd'
            },
            __typename: 'Engagement'
          }
        }
      }
    },
    GetEngagementProposeEndDate: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          proposedEnd: {
            id: 'VjEtUHJvcG9zZWRFbmdhZ2VtZW50RW5kLTIyOTY',
            endDate: '2021-11-02',
            __typename: 'ProposedEngagementEnd'
          },
          __typename: 'Engagement'
        }
      }
    }
  })
}

export default updateEstimatedEndDateStubs
