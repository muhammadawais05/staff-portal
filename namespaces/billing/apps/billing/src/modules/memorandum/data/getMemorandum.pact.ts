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
  URL,
  ID,
  AMOUNT,
  CALLABLE
} from '@staff-portal/billing/src/_lib/pact'

import { GetMemorandumDocument } from './getMemorandum.graphql.types'

const { somethingLike } = Matchers

describe('Get Memorandum query', () => {
  const { provider, client } = setupGatewayStaffPactIntegration()

  describe('Get Memorandum', () => {
    describe('with memorandum id', () => {
      const variables = {
        memorandumId: 'VjEtTWVtb3JhbmR1bS0yNjUxMTQ'
      }

      beforeEach(() => {
        const graphqlQuery = new GraphQLInteraction()
          .given('memorandum details can be returned') // provider state
          .uponReceiving('GetMemorandum')
          .withOperation('GetMemorandum')
          .withQuery(serializeQuery(GetMemorandumDocument))
          .withVariables(variables)
          .withRequest(gatewayHeaders)
          .willRespondWith({
            body: {
              data: {
                node: {
                  allocated: boolean(),
                  allocatedAt: somethingLike('2021-11-02T09:41:45+03:00'),
                  amount: AMOUNT(),
                  amountDue: AMOUNT(),
                  balance: string(),
                  category: {
                    credit: string(),
                    debit: string(),
                    id: ID(),
                    name: string()
                  },
                  depositCorrection: false,
                  description: string(),
                  document: {
                    id: ID(),
                    documentNumber: integer(),
                    invoiceKind: string(),
                    subjectObject: {
                      fullName: string(),
                      id: ID()
                    },
                    webResource: {
                      text: string(),
                      url: URL()
                    }
                  },
                  downloadHtmlUrl: URL(),
                  downloadPdfUrl: URL(),
                  id: ID('VjEtTWVtb3JhbmR1bS0yNjUxMTQ'),
                  number: integer(),
                  operations: {
                    revertInvoicePrepayments: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    revertCommercialDocumentMemorandum: {
                      callable: CALLABLE(),
                      messages: []
                    },
                    revertRoleMemorandum: {
                      callable: CALLABLE(),
                      messages: []
                    }
                  },
                  portions: []
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
          query: GetMemorandumDocument,
          variables: variables,
          fetchPolicy: 'no-cache'
        })

        expect(results.data.node.id).toBe('VjEtTWVtb3JhbmR1bS0yNjUxMTQ')
      })
    })
  })
})
