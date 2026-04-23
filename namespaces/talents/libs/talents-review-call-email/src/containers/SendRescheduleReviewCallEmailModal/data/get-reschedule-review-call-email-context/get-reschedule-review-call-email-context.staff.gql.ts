import { useNotifications } from '@toptal/picasso/utils'
import { StepType } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { EmailContext } from '@staff-portal/communication-send-email'

import {
  GetRescheduleReviewCallEmailContextDocument,
  GetRescheduleReviewCallEmailContextQuery
} from './get-reschedule-review-call-email-context.staff.gql.types'
import { EMAIL_MESSAGING_RESCHEDULE_REVIEW_CALL_FRAGMENT } from '../email-messaging-reschedule-review-call-fragment/email-messaging-reschedule-review-call-fragment.staff.gql'
import { CALL_RECIPIENT_CONTACT_FRAGMENT } from '../../../../data/call-recipient-contact-fragment/call-recipient-contact-fragment.staff.gql'
import { convertToReviewCallEmailContext } from '../../../../services/convert-to-review-call-email-context/convert-to-review-call-email-context'

export default gql`
  query GetRescheduleReviewCallEmailContext($nodeId: ID!) {
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
              ...EmailMessagingRescheduleReviewCallFragment
            }
          }
        }
      }
    }
  }

  ${CALL_RECIPIENT_CONTACT_FRAGMENT}
  ${EMAIL_MESSAGING_RESCHEDULE_REVIEW_CALL_FRAGMENT}
`

const convertToEmailContext = (
  node: NonNullable<GetRescheduleReviewCallEmailContextQuery['node']>
): EmailContext | undefined => {
  const { contacts, activation } = node

  const activationStep = activation?.steps?.nodes.find(
    ({ type }) => type === StepType.REVIEW_CALL
  )

  return convertToReviewCallEmailContext(
    activationStep?.emailMessagingReschedule,
    contacts
  )
}

export const useGetRescheduleReviewCallEmailContext = ({
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
    GetRescheduleReviewCallEmailContextDocument,
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
