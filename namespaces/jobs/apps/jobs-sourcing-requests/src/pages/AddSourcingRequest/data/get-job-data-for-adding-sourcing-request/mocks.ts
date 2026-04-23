import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  GetJobDataForAddingSourcingRequestQuery,
  GetJobDataForAddingSourcingRequestDocument
} from './get-job-data-for-adding-sourcing-request.staff.gql.types'

export const createGetJobDataForAddingSourcingRequestMock = ({
  encodedJobId,
  jobData,
  loading
}: {
  encodedJobId: string
  jobData?: Partial<GetJobDataForAddingSourcingRequestQuery['node']>
  loading?: boolean
}): MockedResponse => {
  const result = loading
    ? undefined
    : {
        data: {
          node: {
            __typename: 'Job',
            id: '123',
            title: 'Principal Developer (123)',
            webResource: {
              __typename: 'Link',
              text: 'Principal Developer (123)',
              url: 'http://localhost:3000/platform/staff/jobs/123'
            },
            client: {
              id: '1',
              enterprise: false,
              __typename: 'Client'
            },
            ...jobData
          }
        }
      }

  return {
    request: {
      query: GetJobDataForAddingSourcingRequestDocument,
      variables: {
        jobId: encodedJobId
      }
    },
    result
  }
}
