import { GraphQLInteraction, Matchers } from '@pact-foundation/pact'
import {
  integer,
  string,
  boolean
} from '@pact-foundation/pact/src/dsl/matchers'
import {
  gatewayHeaders,
  serializeQuery,
  setupGatewayStaffPactIntegration,
  ID,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetClientBillingDetailsDocument } from './getClientBillingDetails.graphql.types'

const { somethingLike } = Matchers

describe('Client Billing Details', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Client Billing Details', () => {
    describe('by client id', () => {
      const variables = {
        clientId: 'VjEtQ2xpZW50LTIyNDA2MQ'
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('client billing details are returned')
          .uponReceiving('GetClientBillingDetails')
          .withOperation('GetClientBillingDetails')
          .withQuery(serializeQuery(GetClientBillingDetailsDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  id: 'VjEtQ2xpZW50LTIyNDA2MQ',
                  _companyId: somethingLike(859406),
                  fullName: string(),
                  invoices: {
                    totalCount: integer()
                  },
                  billingAddress: string(),
                  billingName: string(),
                  billingCity: string(),
                  billingZip: string(),
                  billingState: string(),
                  billingCountry: {
                    name: string()
                  },
                  billingPhone: string(),
                  billingNotes: string(),
                  billingOptions: {
                    nodes: [
                      {
                        accountInfo: [
                          {
                            label: string('Routing number'),
                            value: string()
                          },
                          {
                            label: string('Account number'),
                            value: string()
                          }
                        ],
                        comment: string(),
                        status: string(),
                        billingMethod: string(),
                        discountValue: integer(),
                        discountable: boolean(),
                        id: ID(),
                        name: string(),
                        preferred: boolean(),
                        last4Digits: string(),
                        operations: {
                          preferEnterpriseBillingOption: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          removeBillingOption: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          removeEnterpriseBillingOption: {
                            callable: CALLABLE(),
                            messages: []
                          },
                          unsetPreferredBillingOption: {
                            callable: CALLABLE(),
                            messages: []
                          }
                        },
                        isLastPullMethod: boolean()
                      }
                    ]
                  },
                  netTerms: integer(),
                  enterprise: boolean(),
                  collectionSpeed: null,
                  notifyAboutNewInvoices: boolean(),
                  autoAllocateMemos: boolean(),
                  attachTimesheetsToInvoices: boolean(),
                  investmentGrade: boolean(),
                  commitmentSettings: null,
                  jobTemplate: null,
                  operations: {
                    updateBillingNotes: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientAttachTimesheetsToInvoices: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientAutoAllocateMemos: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientBillingAddress: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientCommitment: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientNetTerms: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientCollectionSpeed: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientNotifyAboutNewInvoices: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    updateClientInvestmentGrade: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    downloadClientBillingReport: {
                      callable: CALLABLE(),
                      messages: []
                    }
                  }
                }
              }
            },
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            status: 200
          })

        return provider.addInteraction(graphqlQuery)
      })

      it('returns the correct response', async () => {
        const results = await client.query({
          query: GetClientBillingDetailsDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.billingOptions.nodes).toHaveLength(1)
      })
    })
  })
})
