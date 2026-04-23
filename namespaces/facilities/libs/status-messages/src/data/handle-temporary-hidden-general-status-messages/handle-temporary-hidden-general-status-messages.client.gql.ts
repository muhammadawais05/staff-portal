import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  STATUS_MESSAGE_FRAGMENT,
  StatusMessageFragment
} from '../status-message-fragment'
import { HiddenStatusMessagesHandler } from '../../types'

export const GET_HIDDEN_STATUS_MESSAGES = gql`
  query GetHiddenStatusMessages {
    hiddenStatusMessages @client {
      ...StatusMessageFragment
    }
  }
  ${STATUS_MESSAGE_FRAGMENT}
`

export const useHandleTemporaryHiddenGeneralStatusMessages =
  (): HiddenStatusMessagesHandler => {
    const { data, client } = useQuery<{
      hiddenStatusMessages: StatusMessageFragment[]
    }>(GET_HIDDEN_STATUS_MESSAGES)

    const setHiddenStatusMessages = (
      hiddenStatusMessages: StatusMessageFragment[]
    ) =>
      client.writeQuery({
        query: GET_HIDDEN_STATUS_MESSAGES,
        data: { hiddenStatusMessages }
      })

    const hiddenStatusMessages = data?.hiddenStatusMessages || []
    const hideMessage = (statusMessage: StatusMessageFragment) => {
      setHiddenStatusMessages([...hiddenStatusMessages, statusMessage])
    }

    const filterOutHiddenMessages = (statusMessages: StatusMessageFragment[]) =>
      statusMessages.filter(
        ({ text: statusText }) =>
          !hiddenStatusMessages.some(({ text }) => text === statusText)
      )

    return {
      hideMessage,
      filterOutHiddenMessages
    }
  }
