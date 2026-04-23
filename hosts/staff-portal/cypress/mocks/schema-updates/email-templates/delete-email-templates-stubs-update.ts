import { emailTemplatesPageStubs } from '~integration/mocks/request-stubs'
import { successOperationMock } from '~integration/mocks/operations'

const deleteCloneEmailTemplatesStubsForEmailTemplatesPage = () => {
  cy.stubGraphQLRequests({
    ...emailTemplatesPageStubs,
    GetLazyOperation: {
      data: {
        node: {
          id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjM5MzQ',
          operations: {
            destroyEmailTemplate: {
              callable: 'ENABLED',
              messages: [],
              __typename: 'Operation'
            },
            __typename: 'EmailTemplateOperations'
          },
          __typename: 'EmailTemplate'
        }
      }
    },
    DestroyEmailTemplate: {
      data: {
        destroyEmailTemplate: successOperationMock()
      }
    }
  })
}

export default deleteCloneEmailTemplatesStubsForEmailTemplatesPage
