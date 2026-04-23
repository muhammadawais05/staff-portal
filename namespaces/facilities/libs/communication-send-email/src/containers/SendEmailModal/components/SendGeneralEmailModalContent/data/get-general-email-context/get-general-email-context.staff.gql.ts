import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import {
  EmailMessagingFragment,
  EMAIL_MESSAGING_FRAGMENT
} from '../../../../data/fragments'
import { GetGeneralEmailContextDocument } from './get-general-email-context.staff.gql.types'

export default gql`
  query GetGeneralEmailContext($nodeId: ID!) {
    staffNode(id: $nodeId) {
      ... on Node {
        id
      }

      ... on EmailMessaging {
        ...EmailMessagingFragment
      }

      ... on Client {
        id
        emailMessaging {
          ...EmailMessagingFragment
        }
      }

      ... on Role {
        id
        emailMessaging {
          ...EmailMessagingFragment
        }
      }

      ... on Meeting {
        emailMessaging {
          ...EmailMessagingFragment
        }
      }

      ... on SpecializationApplication {
        id
        emailMessaging {
          ...EmailMessagingFragment
        }
      }

      ... on RoleStep {
        id
        emailMessaging {
          ...EmailMessagingFragment
        }
      }

      ... on Staff {
        id
        emailMessaging {
          ...EmailMessagingFragment
        }
      }
    }
  }

  ${EMAIL_MESSAGING_FRAGMENT}
`

const ERROR_MESSAGE = 'Unable to get the email context.'

export const useGetGeneralEmailContext = ({
  nodeId,
  onCompleted
}: {
  nodeId: string
  onCompleted?: () => void
}) => {
  const { showError } = useNotifications()

  const { data, refetch, loading, ...rest } = useQuery(
    GetGeneralEmailContextDocument,
    {
      variables: { nodeId },
      fetchPolicy: 'cache-first',
      onCompleted: ({ staffNode }) => {
        if (!staffNode?.id) {
          showError(ERROR_MESSAGE)
        }

        onCompleted?.()
      },
      onError: () => {
        showError(ERROR_MESSAGE)
      }
    }
  )

  const emailContext =
    data?.staffNode && 'emailMessaging' in data.staffNode
      ? data.staffNode.emailMessaging
      : (data?.staffNode as EmailMessagingFragment)

  return {
    emailContext,
    refetchEmailContext: () => refetch?.(),
    loading,
    ...rest
  }
}
