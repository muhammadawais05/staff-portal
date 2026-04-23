import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetTalentResumeJobsDocument,
  GetTalentResumeJobsQuery
} from './get-talent-resume-jobs.staff.gql.types'

export default gql`
  query GetTalentResumeJobs($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        resumeJobs {
          nodes {
            id
            clientName
            resumeRedirectUrl
            title
          }
        }
      }
    }
  }
`

export const useGetTalentResumeJobs = (
  talentId: string,
  options?: {
    onCompleted?: (data: GetTalentResumeJobsQuery) => void
    onError?: () => void
  }
) => {
  const [fetch, { data, loading, called, error }] = useLazyQuery(
    GetTalentResumeJobsDocument,
    {
      variables: { talentId },
      ...options
    }
  )

  return {
    fetch,
    loading,
    error,
    data,
    called
  }
}
