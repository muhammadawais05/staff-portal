import { gql, useQuery } from '@staff-portal/data-layer-service'
import { EMAIL_MESSAGING_FRAGMENT } from '@staff-portal/communication-send-email'

import { GetEmailApplicantsDataDocument } from './get-email-applicants-recipient.staff.gql.types'

export default gql`
  query GetEmailApplicantsData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        applications {
          nodes {
            ...EmailApplicantsApplicationFragment
          }
        }
        applicantsEmailMessaging {
          ...EmailMessagingJobApplicantsFragment
        }
      }
    }
  }

  fragment EmailApplicantsApplicationFragment on JobApplication {
    id
    talent {
      id
      fullName
      ofacStatus
    }
  }

  fragment EmailMessagingJobApplicantsFragment on EmailMessagingJobApplication {
    ...EmailMessagingFragment
    id
    blankEmailTemplate {
      id
      rawTemplate
      name
    }
  }

  ${EMAIL_MESSAGING_FRAGMENT}
`

export const useGetEmailApplicantsRecipient = ({
  jobId,
  onCompleted,
  onError
}: {
  jobId: string
  onCompleted: (success: boolean) => void
  onError: () => void
}) => {
  const { data, refetch, loading } = useQuery(GetEmailApplicantsDataDocument, {
    onCompleted: ({ node }) => onCompleted?.(Boolean(node)),
    onError,
    fetchPolicy: 'cache-first',
    variables: { jobId }
  })

  return {
    recipient: data?.node?.applicantsEmailMessaging,
    applications: data?.node?.applications,
    refetchRecipient: () => {
      refetch?.()
    },
    loading
  }
}
