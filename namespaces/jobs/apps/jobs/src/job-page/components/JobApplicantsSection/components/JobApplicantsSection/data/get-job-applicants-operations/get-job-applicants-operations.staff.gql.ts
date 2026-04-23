import { gql, useGetData } from '@staff-portal/data-layer-service'

import { GetJobApplicantsOperationDocument } from './get-job-applicants-operations.staff.gql.types'

export const GET_JOB_APPLICANTS_OPERATIONS = gql`
  query GetJobApplicantsOperation {
    operations {
      rejectJobApplicants {
        callable
        messages
      }
      emailJobApplicants {
        callable
        messages
      }
    }
  }
`

export const useGetJobApplicantsOperations = () =>
  useGetData(GetJobApplicantsOperationDocument, 'operations')()
