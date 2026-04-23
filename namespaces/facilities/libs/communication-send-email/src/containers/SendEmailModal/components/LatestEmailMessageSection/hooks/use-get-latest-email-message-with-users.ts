import { useDecorateEmailMessagesWithUsers } from '@staff-portal/communication'

import { useGetLatestEmailMessage } from '../data/get-latest-email-message'

export const useGetLatestEmailMessageWithUsers = (
  emails: string[],
  {
    onError
  }: {
    onError: () => void
  }
) => {
  const { emailMessage, loading: getLatestEmailMessageLoading } =
    useGetLatestEmailMessage(emails, {
      onError
    })

  const {
    emailMessagesWithUsers,
    loading: decorateEmailMessageWithUsersLoading
  } = useDecorateEmailMessagesWithUsers(emailMessage ? [emailMessage] : [], {
    onError,
    skip: !emailMessage
  })

  return {
    loading:
      getLatestEmailMessageLoading || decorateEmailMessageWithUsersLoading,
    emailMessageWithUsers: emailMessagesWithUsers?.[0]
  }
}
