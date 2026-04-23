import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import { talentSourcingRequestsStubs } from '~integration/mocks/request-stubs/talents/tabs/sourcing-requests'

const updateLinkSourcingRequestsStubs = () =>
  cy.stubGraphQLRequests({
    ...talentSourcingRequestsStubs(),
    GetJobsWithSourcingRequestsAutocomplete: {
      data: {
        autocomplete: {
          edges: [
            {
              key: '1',
              label: 'Lead Program Developer (176148)',
              labelHighlight: null,
              node: {
                id: encodeEntityId('123', 'Job'),
                __typename: 'Job'
              },
              __typename: 'AutocompleteEdge'
            }
          ],
          __typename: 'AutocompleteConnection'
        }
      }
    },
    LinkSourcingRequest: {
      data: {
        linkSourcingRequest: successMutationMock()
      }
    }
  })

export default updateLinkSourcingRequestsStubs
