import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetResolvedJobApplicationsDocument } from './get-resolved-job-applications.staff.gql.types'
import { JOB_APPLICATION_FRAGMENT } from '../../../../data/job-application-fragment'

export const GET_RESOLVED_JOB_APPLICATIONS: typeof GetResolvedJobApplicationsDocument = gql`
  query GetResolvedJobApplications($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        jobApplications(
          filter: {
            statuses: [ACCEPTED, CANCELLED, POSITION_FULFILLED, REJECTED]
          }
          pagination: { limit: 10000, offset: 0 }
        ) {
          nodes {
            ...jobApplicationFragment
          }
        }
      }
    }
  }

  ${JOB_APPLICATION_FRAGMENT}
`

export const useLazyGetResolvedJobApplications = (talentId: string) => {
  const [getResolvedJobApplication, { data, loading, error }] = useLazyQuery(
    GET_RESOLVED_JOB_APPLICATIONS,
    {
      variables: { talentId }
    }
  )

  if (error && !data) {
    throw error
  }

  return {
    data: data?.node?.jobApplications?.nodes,
    loading,
    getResolvedJobApplication
  }
}
