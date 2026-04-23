import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import {
  GetStatusMessagesDocument,
  GetStatusMessagesQueryVariables
} from './get-status-messages.staff.gql.types'
import { STATUS_MESSAGE_FRAGMENT } from '../status-message-fragment/status-message-fragment.staff.gql'
import { STATUS_MESSAGES_BATCH_KEY } from '../../constants'
import { getCurrentTimezoneSettings } from '../../utils'

export const GET_STATUS_MESSAGES: typeof GetStatusMessagesDocument = gql`
  query GetStatusMessages($timezoneName: String, $timezoneOffset: Int) {
    viewer {
      me {
        id
      }
      statusMessages(
        timeZoneName: $timezoneName
        timeZoneOffset: $timezoneOffset
      ) {
        nodes {
          ...StatusMessageFragment
        }
      }
    }
  }
  ${STATUS_MESSAGE_FRAGMENT}
`

export const useGetStatusMessages = ({ onError }: { onError: () => void }) => {
  const { timezoneName, timezoneOffset } = getCurrentTimezoneSettings()

  const variables: GetStatusMessagesQueryVariables = {
    timezoneName,
    timezoneOffset
  }

  const { data, loading, error } = useQuery(GET_STATUS_MESSAGES, {
    onError,
    variables,
    fetchPolicy: 'network-only',
    context: { [BATCH_KEY]: STATUS_MESSAGES_BATCH_KEY }
  })

  return { data: data?.viewer.statusMessages.nodes, loading, error }
}
