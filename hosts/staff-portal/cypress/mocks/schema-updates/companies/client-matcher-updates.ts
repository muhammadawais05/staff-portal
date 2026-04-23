import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import { getClientMatchersResponse } from '../../responses'
import { getBasicInfoOperationsMock } from './basic-info-operations-mock'

const updateClientMatcherMocks = () => {
  const mockedClient = {
    operations: getClientOperations(getBasicInfoOperationsMock())
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(mockedClient),
    GetUserVerticals: {
      data: {
        verticals: {
          nodes: [
            {
              id: 'VjEtVmVydGljYWwtMQ',
              talentType: 'developer',
              name: 'Developer',
              hasTalentQuizQuestions: true,
              specializations: {
                nodes: [],
                totalCount: 14
              },
              __typename: 'Vertical'
            }
          ],
          __typename: 'VerticalConnection'
        }
      }
    },
    GetClientMatchers: getClientMatchersResponse(),
    GetMatchersForVertical: {
      data: {
        node: {
          clientMatchers: {
            nodes: [
              {
                id: encodeEntityId('3', 'Staff'),
                fullName: 'Charles Boyle',
                __typename: 'Staff'
              },
              {
                id: 'VjEtU3RhZmYtMjQ2NDYwNA',
                fullName: 'Carmelo Vignoli',
                __typename: 'Staff'
              }
            ],
            totalCount: 2,
            __typename: 'StaffConnection'
          },
          __typename: 'Vertical'
        }
      }
    },
    SetUpdateClientMatcher: {
      data: {
        updateClientMatcher: {
          client: {
            id: encodeEntityId('123', 'Client'),
            matchers: {
              edges: [
                {
                  node: {
                    id: 'VjEtQ2xpZW50TWF0Y2hlci03MzExNA',
                    role: {
                      id: 'VjEtU3RhZmYtMjU5NDU0Mw',
                      fullName: 'Ana Balderramas',
                      webResource: {
                        url: 'https://staging.toptal.net/platform/staff/staff/2594543',
                        text: 'Ana Balderramas',
                        __typename: 'Link'
                      },
                      __typename: 'Staff'
                    },
                    vertical: {
                      id: 'VjEtVmVydGljYWwtMg',
                      talentType: 'designer',
                      __typename: 'Vertical'
                    },
                    __typename: 'ClientMatcher'
                  },
                  handoff: null,
                  __typename: 'ClientMatcherEdge'
                },
                {
                  node: {
                    id: 'VjEtQ2xpZW50TWF0Y2hlci01ODg5Nw',
                    role: {
                      id: 'VjEtU3RhZmYtMzI2NjUyNA',
                      fullName: 'Charles Boyle',
                      webResource: {
                        url: 'https://staging.toptal.net/platform/staff/staff/3266524',
                        text: 'Charles Boyle',
                        __typename: 'Link'
                      },
                      __typename: 'Staff'
                    },
                    vertical: {
                      id: 'VjEtVmVydGljYWwtMQ',
                      talentType: 'developer',
                      __typename: 'Vertical'
                    },
                    __typename: 'ClientMatcher'
                  },
                  handoff: null,
                  __typename: 'ClientMatcherEdge'
                }
              ],
              __typename: 'ClientMatcherConnection'
            },
            __typename: 'Client'
          },
          success: true,
          errors: [],
          __typename: 'UpdateClientMatcherPayload'
        }
      }
    }
  })
}

export default updateClientMatcherMocks
