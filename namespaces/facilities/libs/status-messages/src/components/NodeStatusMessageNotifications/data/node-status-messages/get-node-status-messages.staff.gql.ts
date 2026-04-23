import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { STATUS_MESSAGES_BATCH_KEY } from '../../../../constants'
import { STATUS_MESSAGE_FRAGMENT } from '../../../../data/status-message-fragment'
import { GetNodeStatusMessagesDocument } from './get-node-status-messages.staff.gql.types'

export default gql`
  query GetNodeStatusMessages($id: ID!) {
    node(id: $id) {
      ... on CompanyRepresentative {
        id
        statusMessages {
          nodes {
            ...StatusMessageFragment
          }
        }
      }

      ... on Client {
        id
        statusMessages {
          nodes {
            ...StatusMessageFragment
          }
        }
      }

      ... on Staff {
        id
        statusMessages {
          nodes {
            ...StatusMessageFragment
          }
        }
      }

      ... on Job {
        id
        statusMessages {
          nodes {
            ...StatusMessageFragment
          }
        }
      }

      ... on Talent {
        id
        statusMessages {
          nodes {
            ...StatusMessageFragment
          }
        }
      }
    }
  }

  ${STATUS_MESSAGE_FRAGMENT}
`

export const useGetNodeStatusMessages = (id: string) => {
  const { data, ...rest } = useQuery(GetNodeStatusMessagesDocument, {
    variables: { id },
    context: { [BATCH_KEY]: STATUS_MESSAGES_BATCH_KEY },
    throwOnError: true
  })

  return {
    statusMessages: data?.node?.statusMessages?.nodes,
    ...rest
  }
}
