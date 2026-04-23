import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  ContactType,
  Job,
  JobOperations
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobMock } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'

const updateContactInformationMocks = (job?: Partial<Job>) => {
  const client = {
    contact: {
      __typename: 'CompanyRepresentative',
      id: encodeEntityId('123', 'CompanyRepresentative'),
      fullName: 'Company Representative Name',
      phoneNumber: '+14699899514',
      email: 'cind-b4e755f0b9051e32@toptal.io',
      timeZone: {
        name: '(UTC-06:00) America - Chicago',
        value: 'America/Chicago',
        __typename: 'TimeZone'
      },
      photo: null,
      webResource: {
        url: 'https://toptal.com',
        __typename: 'Link'
      },
      lastLogin: '2022-03-12T06:39:13+03:00',
      contacts: {
        totalCount: 1,
        nodes: [
          {
            __typename: 'CompanyRepresentative',
            id: encodeEntityId('123', 'CompanyRepresentative'),
            primary: true,
            type: ContactType.PHONE,
            value: '+14699899514'
          }
        ]
      }
    },
    representatives: {
      nodes: [
        {
          id: encodeEntityId('456', 'CompanyRepresentative'),
          fullName: 'Shawn Stehr',
          phoneNumber: '+493025761781',
          webResource: {
            text: 'Shawn Stehr',
            url: 'https://toptal.com'
          },
          __typename: 'CompanyRepresentative'
        }
      ],
      totalCount: 1,
      __typename: 'ClientRepresentativesConnection',
      ...job?.client?.representatives
    },
    ...job?.client
  } as Client

  const jobData = {
    client,
    contacts: {
      __typename: 'CompanyRepresentativeConnection',
      totalCount: 1,
      edges: [
        {
          node: client.contact,
          operations: {
            __typename: 'JobOperations',
            removeJobContact: enabledOperationMock()
          },
          __typename: 'JobContactEdge'
        }
      ],
      ...job?.contacts
    },
    operations: {
      createJobContactFromJob: enabledOperationMock(),
      ...job?.operations
    } as JobOperations,
    ...job
  } as Job

  cy.stubGraphQLRequests({
    ...jobPageStubs(jobData),
    GetJobClientRepresentatives: {
      data: {
        node: getJobMock(jobData)
      }
    },
    CallContact: {
      data: {
        callContact: {
          ...successMutationMock(),
          externalCallUrl: '/jobs/456'
        }
      }
    },
    CreateJobContact: {
      data: {
        createJobContactFromJob: {
          ...successMutationMock()
        }
      }
    },
    RemoveJobContact: {
      data: {
        removeJobContact: {
          ...successMutationMock()
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            createJobContactFromJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    }
  })
}

export default updateContactInformationMocks
