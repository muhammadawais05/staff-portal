import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { EmailAddress } from '@staff-portal/graphql/lens'
import { Maybe } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'

import { EMAIL_ASSOCIATED_WITH_USER } from '../../messages'
import { useGetUsersByEmails } from '../../data/get-users-by-emails'
import { UserByEmailFragment } from '../../data/user-by-email-fragment'
import { EmailMessageFragment } from '../../data/email-message-fragment/email-message-fragment.lens.gql.types'
import { EmailContact, EmailMessageWithUsers } from '../../types'

const extractEmailAddresses = (emailMessages: EmailMessageFragment[]) => {
  const emailAddresses = new Set<string>()

  emailMessages.forEach(({ from, to }) => {
    emailAddresses.add(from.email)
    to.forEach(contact => emailAddresses.add(contact.email))
  })

  return Array.from(emailAddresses)
}

const indexUsersByEmailsData = (
  emailAddresses: string[],
  usersByEmailsData: Maybe<UserByEmailFragment>[] | undefined
) =>
  usersByEmailsData &&
  new Map(
    usersByEmailsData
      ?.map<[string, UserByEmailFragment] | null>((user, index) =>
        user && emailAddresses[index] ? [emailAddresses[index], user] : null
      )
      .filter(isNotNullish)
  )

const decorateContactWithUser = (
  contact: EmailAddress,
  usersByEmails: Map<string, UserByEmailFragment> | undefined
): EmailContact => {
  const userByEmail = usersByEmails?.get(contact.email || '')
  const userData = userByEmail
    ? {
        id: userByEmail.id,
        name: userByEmail.fullName,
        path: userByEmail.webResource.url ?? undefined
      }
    : undefined

  return {
    ...contact,
    ...userData,
    __typename: 'EmailAddress'
  }
}

const decorateEmailMessageWithUsers = (
  emailMessage: EmailMessageFragment,
  usersByEmails: Map<string, UserByEmailFragment> | undefined
): EmailMessageWithUsers => {
  const { from, to } = emailMessage
  const fromWithUser = decorateContactWithUser(from, usersByEmails)
  const toWithUsers =
    to.map(contact => decorateContactWithUser(contact, usersByEmails)) || null

  return { ...emailMessage, fromWithUser, toWithUsers }
}

const decorateEmailMessagesWithUsers = (
  emailMessages: EmailMessageFragment[],
  usersByEmails: Map<string, UserByEmailFragment> | undefined
) =>
  emailMessages.map(emailMessage =>
    decorateEmailMessageWithUsers(emailMessage, usersByEmails)
  )

export const useDecorateEmailMessagesWithUsers = (
  emailMessages: EmailMessageFragment[],
  {
    onCompleted,
    onError,
    skip
  }: { onCompleted?: () => void; onError: () => void; skip?: boolean }
) => {
  const emailAddresses = extractEmailAddresses(emailMessages)
  const {
    loading,
    refetch,
    data: usersByEmailsData
  } = useGetUsersByEmails(emailAddresses, {
    skip: skip || emailAddresses.length === 0,
    onCompleted,
    onError
  })

  useMessageListener(EMAIL_ASSOCIATED_WITH_USER, () => refetch())

  const usersByEmails = indexUsersByEmailsData(
    emailAddresses,
    usersByEmailsData
  )
  const emailMessagesWithUsers = decorateEmailMessagesWithUsers(
    emailMessages,
    usersByEmails
  )

  return { emailMessagesWithUsers, loading }
}
