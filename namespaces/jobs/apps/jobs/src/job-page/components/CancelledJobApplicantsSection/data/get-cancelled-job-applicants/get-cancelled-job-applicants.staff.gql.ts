import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetCancelledJobApplicantsDocument } from './get-cancelled-job-applicants.staff.gql.types'

export const GET_CANCELLED_JOB_APPLICANTS = gql`
  query GetCancelledJobApplicants($jobId: ID!) {
    node(id: $jobId) {
      ...CancelledJobApplicantsSectionFragment
    }
  }

  fragment CancelledJobApplicantsSectionFragment on Job {
    id
    applications(
      filter: { statuses: [CANCELLED] }
      pagination: { offset: 0, limit: 30 }
    ) {
      nodes {
        ...CancelledJobApplicantFragment
      }
    }
  }

  fragment CancelledJobApplicantFragment on JobApplication {
    id
    webResource {
      url
    }
    createdAt
    talent {
      id
      fullName
      type
    }
    approveUrl
    approveUrlTooltip
    operations {
      emailJobApplicant {
        ...OperationFragment
      }
    }
    emailMessaging {
      id
    }

    ${OPERATION_FRAGMENT}
  }
`

export const useGetCancelledJobApplicants = (jobId: string) => {
  const { data, ...restOptions } = useQuery(GetCancelledJobApplicantsDocument, {
    variables: { jobId }
  })

  return {
    ...restOptions,
    cancelledJobApplicants: data?.node?.applications?.nodes
  }
}
