import { encodeEntityId } from '@staff-portal/data-layer-service'

import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'
import { getJobListItemResponse } from '~integration/mocks/responses'

export const updateJobsTabMocks = () => {
  cy.stubGraphQLRequests({
    ...companiesSharedStubs(),
    GetCompanyJobs: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          addJobLink: {
            enabled: true,
            messages: ['Add new Job'],
            url: 'https://staging.toptal.net/platform/staff/jobs/new',
            __typename: 'UrlWithMessages'
          },
          children: {
            totalCount: 1,
            __typename: 'ClientChildrenConnection'
          },
          jobs: {
            nodes: [
              {
                id: encodeEntityId('123', 'Job'),
                __typename: 'Job'
              }
            ],
            totalCount: 1,
            __typename: 'ClientJobConnection'
          },
          __typename: 'Client'
        }
      }
    },
    GetJobListItem: getJobListItemResponse(),
    EditJobInvoiceNote: {
      data: {
        editJobInvoiceNote: {
          success: true,
          errors: [],
          __typename: 'EditJobInvoiceNotePayload',
          job: {
            id: encodeEntityId('123', 'Job'),
            invoiceNote: 'Some invoice note',
            __typename: 'Job'
          }
        }
      }
    }
  })
}
