import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateEnableTopscreenStubs = (client?: Partial<Client>) =>
  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          operations: {
            enableTopscreenFeature: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    EnableTopscreenFeature: {
      data: {
        enableTopscreenFeature: {
          clientMutationId: null,
          ...successMutationMock(),
          __typename: 'EnableTopscreenFeaturePayload'
        }
      }
    }
  })

export default updateEnableTopscreenStubs
