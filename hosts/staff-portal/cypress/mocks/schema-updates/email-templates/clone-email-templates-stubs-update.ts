import { emailTemplatesPageStubs } from '~integration/mocks/request-stubs'
import { successOperationMock } from '~integration/mocks/operations'

const updateCloneEmailTemplatesStubsForEmailTemplatesPage = () => {
  cy.stubGraphQLRequests({
    ...emailTemplatesPageStubs,
    GetEmailTemplateTargetRoles: {
      data: {
        originals: {
          nodes: [
            {
              title: 'Developer',
              value: 'Developer',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Designer',
              value: 'Designer',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Finance Expert',
              value: 'FinanceExpert',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Project Manager',
              value: 'ProjectManager',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Product Manager',
              value: 'ProductManager',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Top Screen',
              value: 'TopScreen',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Marketing Expert',
              value: 'MarketingExpert',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Dfdsgdsg',
              value: 'Dfdsgdsg',
              __typename: 'EmailTemplateTargetRole'
            }
          ],
          __typename: 'EmailTemplateTargetRoleConnection'
        },
        destinations: {
          nodes: [
            {
              title: 'Developer',
              value: 'developer1',
              __typename: 'EmailTemplateTargetRole'
            }
          ],
          __typename: 'EmailTemplateTargetRoleConnection'
        },
        emailTemplateTargetRoles: {
          nodes: [
            {
              title: 'Developer',
              value: 'Developer',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Designer',
              value: 'Designer',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Finance Expert',
              value: 'FinanceExpert',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Project Manager',
              value: 'ProjectManager',
              __typename: 'EmailTemplateTargetRole'
            },
            {
              title: 'Product Manager',
              value: 'ProductManager',
              __typename: 'EmailTemplateTargetRole'
            }
          ],
          __typename: 'EmailTemplateTargetRoleConnection'
        }
      }
    },
    CloneEmailTemplates: {
      data: {
        cloneTargetRoleEmailTemplates: successOperationMock()
      }
    }
  })
}

export default updateCloneEmailTemplatesStubsForEmailTemplatesPage
