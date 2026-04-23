import { useNotifications } from '@toptal/picasso/utils'
import { StepType } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { EmailContext } from '@staff-portal/communication-send-email'

import {
  GetRestorationReviewCallEmailContextDocument,
  GetRestorationReviewCallEmailContextQuery
} from './get-restoration-review-call-email-context.staff.gql.types'
import { EMAIL_MESSAGING_RESTORATION_REVIEW_CALL_FRAGMENT } from '../email-messaging-restoration-review-call-fragment/email-messaging-restoration-review-call-fragment.staff.gql'
import { CALL_RECIPIENT_CONTACT_FRAGMENT } from '../../../../data/call-recipient-contact-fragment/call-recipient-contact-fragment.staff.gql'
import { convertToReviewCallEmailContext } from '../../../../services/convert-to-review-call-email-context/convert-to-review-call-email-context'

export default gql`
  query GetRestorationReviewCallEmailContext($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Talent {
        id
        contacts(filter: { type: [EMAIL] }) {
          nodes {
            ...CallRecipientContactFragment
          }
        }
        activation {
          id
          steps {
            nodes {
              ...EmailMessagingRestorationReviewCallFragment
            }
          }
        }
      }
    }
  }

  ${CALL_RECIPIENT_CONTACT_FRAGMENT}
  ${EMAIL_MESSAGING_RESTORATION_REVIEW_CALL_FRAGMENT}
`

export const convertToEmailContext = (
  node: NonNullable<GetRestorationReviewCallEmailContextQuery['node']>
): EmailContext | undefined => {
  const { contacts, activation } = node

  const activationStep = activation?.steps?.nodes.find(
    ({ type }) => type === StepType.REVIEW_CALL
  )

  return convertToReviewCallEmailContext(
    activationStep?.emailMessagingRestoration,
    contacts
  )
}

export const useGetRestorationReviewCallEmailContext = ({
  nodeId,
  onCompleted
}: {
  nodeId: string
  onCompleted?: () => void
}) => {
  const { showError } = useNotifications()
  const handleError = () => {
    showError('Unable to get the email context.')
  }
  const { data, refetch, loading } = useQuery(
    GetRestorationReviewCallEmailContextDocument,
    {
      variables: { nodeId },
      onCompleted: ({ node }) => {
        if (!node) {
          return handleError()
        }

        onCompleted?.()
      },
      onError: handleError
    }
  )

  return {
    emailContext: data?.node ? convertToEmailContext(data?.node) : undefined,
    refetchEmailContext: () => {
      refetch?.()
    },
    loading
  }
}
