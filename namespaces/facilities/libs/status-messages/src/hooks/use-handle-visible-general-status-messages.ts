import { useGetStatusMessages } from '../data/get-general-status-messages'
import { StatusMessageFragment } from '../data/status-message-fragment'
import { useHandleTemporaryHiddenGeneralStatusMessages } from '../data/handle-temporary-hidden-general-status-messages'
import { useHandlePermanentlyHiddenGeneralStatusMessages } from '../data/handle-permanently-hidden-general-status-messages'

export const useHandleVisibleGeneralStatusMessages = ({
  onError
}: {
  onError: () => void
}) => {
  const { data: statusMessages = [] } = useGetStatusMessages({ onError })

  const {
    filterOutHiddenMessages: filterOutTemporaryHiddenMessages,
    hideMessage: hideGeneralStatusMessageTemporary
  } = useHandleTemporaryHiddenGeneralStatusMessages()

  const {
    filterOutHiddenMessages: filterOutPermanentlyHiddenMessages,
    hideMessage: hideGeneralStatusMessagePermanently
  } = useHandlePermanentlyHiddenGeneralStatusMessages()

  const hideGeneralStatusMessage = (statusMessage: StatusMessageFragment) => {
    if (statusMessage.storeKey) {
      hideGeneralStatusMessagePermanently(statusMessage)
    } else {
      hideGeneralStatusMessageTemporary(statusMessage)
    }
  }

  let filteredStatusMessages = filterOutTemporaryHiddenMessages(statusMessages)

  filteredStatusMessages = filterOutPermanentlyHiddenMessages(
    filteredStatusMessages
  )

  return {
    generalStatusMessages: filteredStatusMessages,
    hideGeneralStatusMessage
  }
}
