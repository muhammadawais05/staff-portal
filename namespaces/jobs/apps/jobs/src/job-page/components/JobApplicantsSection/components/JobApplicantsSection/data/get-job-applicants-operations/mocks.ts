import { MockedResponse } from '@staff-portal/data-layer-service'

import { GET_JOB_APPLICANTS_OPERATIONS } from './get-job-applicants-operations.staff.gql'

export const createJobApplicantsOperations = (): MockedResponse => ({
  request: {
    query: GET_JOB_APPLICANTS_OPERATIONS
  },
  result: {
    data: {
      operations: {
        rejectJobApplicants: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        emailJobApplicants: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'QueryOperations'
      }
    }
  }
})
