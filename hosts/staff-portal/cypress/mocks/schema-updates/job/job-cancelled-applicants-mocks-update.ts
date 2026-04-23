import { JobStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { jobPageStubs } from '../../request-stubs'
import { jobCancelledApplicationMock } from '~integration/mocks'
import { getClientEmailRecipientResponse } from '~integration/mocks/responses'
import { successOperationMock } from '~integration/mocks/operations'

const updateJobCancelledApplicantsMock = (props?: { approveUrl?: string }) => {
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('0', 'JobApplication'),
          operations: {
            emailJobApplicant: enabledOperationMock(),
            __typename: 'JobApplicationOperations'
          },
          __typename: 'JobApplication'
        }
      }
    },
    GetGeneralEmailContext: getClientEmailRecipientResponse(),
    GetCancelledJobApplicants: {
      data: {
        node: {
          id: encodeEntityId('333', 'Job'),
          requiredApplicationPitch: true,
          applications: {
            nodes: [
              jobCancelledApplicationMock({ approveUrl: props?.approveUrl })
            ]
          },
          __typename: 'Job'
        }
      }
    },
    SendEmail: {
      data: {
        sendEmailTo: successOperationMock()
      }
    }
  })
}

export default updateJobCancelledApplicantsMock
