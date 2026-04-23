import { isNotNullish } from '@staff-portal/utils'
import { useDecorateEmailMessagesWithUsers } from '@staff-portal/communication'

import { useGetLazyEmailMessagesList } from '../../../data/get-email-messages-list'

export const useGetEmailMessagesListWithUsers = ({
  onGetUsersByEmailsError,
  roleOrClientId
}: {
  onGetUsersByEmailsError: () => void
  roleOrClientId?: string
}) => {
  const {
    getEmailMessages,
    data: emailMessagesData,
    loading: emailMessagesLoading,
    error: emailMessagesError
  } = useGetLazyEmailMessagesList(roleOrClientId)

  const { emailMessagesWithUsers, loading: emailMessageWithUsersLoading } =
    useDecorateEmailMessagesWithUsers(
      emailMessagesData?.emailMessages?.entities?.filter(isNotNullish) || [],
      { onError: onGetUsersByEmailsError }
    )

  return {
    getEmailMessages,
    emailMessagesWithUsers,
    totalCount: emailMessagesData?.emailMessages?.totalCount,
    loading: emailMessagesLoading || emailMessageWithUsersLoading,
    emailMessagesError
  }
}
