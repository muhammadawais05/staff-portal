import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { JOB_CANDIDATE_OPERATIONS_FRAGMENT } from '@staff-portal/talents'

import { GetJobCandidateOperationsDocument } from './get-lazy-job-candidates-operations.staff.gql.types'

export const GET_JOB_CANDIDATE_OPERATIONS: typeof GetJobCandidateOperationsDocument = gql`
  query GetJobCandidateOperations($jobId: ID!, $talentIds: [ID!]!) {
    nodes(ids: $talentIds) {
      ... on Talent {
        id
        operations {
          ...JobCandidateOperationsFragment
        }
      }
    }
  }

  ${JOB_CANDIDATE_OPERATIONS_FRAGMENT}
`

export const useGetLazyJobCandidatesOperations = () =>
  useLazyQuery(GET_JOB_CANDIDATE_OPERATIONS)
