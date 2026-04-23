import { jobPageStubs } from '~integration/mocks/request-stubs'
import { getChroniclesTokenResponse } from '~integration/mocks/responses'

const updateJobHistoryStubs = (entries: unknown[] = []) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      historyLink: { url: 'https://toptal.com', text: 'History' }
    }),
    GetChroniclesToken: getChroniclesTokenResponse(),
    SearchChronicles: {
      data: {
        viewer: {
          search: {
            nextPage: null,
            entries,
            __typename: 'EntryList'
          },
          __typename: 'Viewer'
        }
      }
    },
    ModelDescriptions: {
      data: {
        modelDescriptions: [
          {
            gid: 'gid://platform/Job/271974',
            associationReferences: [],
            designation: 'job',
            reference: {
              text: 'Lead Digital Imaging Developer (271974)',
              accessible: true,
              options: [],
              path: '/platform/staff/jobs/271974',
              __typename: 'ModelDescriptionLink'
            },
            __typename: 'ModelDescription'
          },
          {
            gid: 'gid://platform/CompanyRepresentative/3023092',
            associationReferences: [],
            designation: 'company representative',
            reference: {
              text: 'Emmy Langworth (Fritsch, Greenholt and Wilderman)',
              accessible: true,
              options: [],
              path: '/platform/staff/company_representatives/3023092',
              __typename: 'ModelDescriptionLink'
            },
            __typename: 'ModelDescription'
          }
        ]
      }
    }
  })

export default updateJobHistoryStubs
