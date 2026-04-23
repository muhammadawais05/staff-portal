import { useDecorateEmailMessagesWithUsers } from '@staff-portal/communication'

import { useGetEmailMessage } from '../data/get-email-message'

export const useGetEmailMessageWithUsers = (
  id: string | undefined,
  { onGetUsersByEmailsError }: { onGetUsersByEmailsError: () => void }
) => {
  const {
    data: emailMessageData,
    loading: emailMessageLoading,
    error: emailMessageError
  } = useGetEmailMessage(id)

  const emailMessage = emailMessageData?.emailMessage

  const { emailMessagesWithUsers, loading: emailMessageWithUsersLoading } =
    useDecorateEmailMessagesWithUsers(emailMessage ? [emailMessage] : [], {
      onError: onGetUsersByEmailsError
    })

  return {
    emailMessageWithUser: emailMessagesWithUsers[0],
    loading: emailMessageLoading || emailMessageWithUsersLoading,
    emailMessageError
  }
}
