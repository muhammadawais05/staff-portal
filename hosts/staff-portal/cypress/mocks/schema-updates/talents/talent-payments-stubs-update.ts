import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'

const updateTalentPaymentsStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            createPaymentHold: enabledOperationMock(),
            removePaymentHold: enabledOperationMock(),
            downloadRolePaymentHistory: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    CreatePaymentHold: {
      data: {
        createPaymentHold: successMutationMock()
      }
    },
    RemovePaymentHold: {
      data: {
        removePaymentHold: successMutationMock()
      }
    },
    DownloadRolePaymentHistory: {
      data: {
        downloadRolePaymentHistory: successMutationMock({
          downloadUrl: 'https://toptal.com/payment-history'
        })
      }
    }
  })

export default updateTalentPaymentsStubs
