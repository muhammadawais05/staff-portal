import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetEmailPreviewDocument,
  GetEmailPreviewQueryVariables
} from './get-email-preview.staff.gql.types'

export const GET_EMAIL_PREVIEW: typeof GetEmailPreviewDocument = gql`
  query GetEmailPreview($id: ID!, $body: String!) {
    node(id: $id) {
      id
      ... on EmailMessagingTalentBookingReschedule {
        emailPreview(body: $body) {
          html
        }
      }
      ... on EmailMessagingIntroductionActivationStep {
        emailPreview(body: $body) {
          html
        }
      }
      ... on EmailMessagingRescheduleActivationStep {
        emailPreview(body: $body) {
          html
        }
      }
      ... on EmailMessagingRestorationActivationStep {
        emailPreview(body: $body) {
          html
        }
      }
      ... on EmailMessagingTalentBookingRestore {
        emailPreview(body: $body) {
          html
        }
      }
      ... on EmailMessagingTalentBookingIntroduce {
        emailPreview(body: $body) {
          html
        }
      }
      ... on EmailMessagingJobApplication {
        emailPreview(body: $body) {
          html
        }
      }
      ... on CompanyRepresentative {
        emailPreview(body: $body) {
          html
        }
      }
    }
  }
`

export const useGetEmailPreview = ({
  variables,
  onError
}: {
  variables: GetEmailPreviewQueryVariables
  onError: (error: Error) => void
}) => {
  const { data, loading, ...restOptions } = useQuery(GET_EMAIL_PREVIEW, {
    variables,
    onError,
    fetchPolicy: 'cache-first'
  })

  let preview

  if (data?.node && 'emailPreview' in data.node) {
    preview = data.node.emailPreview?.html
  }

  return {
    preview,
    loading,
    ...restOptions
  }
}
