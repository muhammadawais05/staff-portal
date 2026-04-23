export { default as PhoneLink } from './components/PhoneLink'
export { default as ClientPhoneLink } from './components/ClientPhoneLink'
export { default as SkypeLink } from './components/SkypeLink'
export { default as EmailMessageListItem } from './components/EmailMessageListItem'
export { default as StartCallLink } from './components/StartCallLink'
export { default as CallClientModal } from './components/CallClientModal/CallClientModal'
export { default as RolePhoneLink } from './components/RolePhoneLink'

export { useCallContact } from './hooks/use-call-contact'
export { useHandleGoogleAppsAuthNotification } from './hooks/use-handle-google-apps-auth-notification'
export { useDecorateEmailMessagesWithUsers } from './hooks/use-decorate-email-messages-with-users'
export { useCallContactWithOperationCheck } from './hooks/use-call-contact-with-operation-check/use-call-contact-with-operation-check'
export { useCommunicateWithTopCall } from './hooks/use-communicate-with-top-call/use-communicate-with-top-call'

export {
  useGetUsersByEmails,
  GET_USERS_BY_EMAILS
} from './data/get-users-by-emails'
export { EMAIL_MESSAGE_FRAGMENT } from './data/email-message-fragment/email-message-fragment.lens.gql'
export { CALLABLE_CLIENT_FRAGMENT } from './data/callable-client-fragment/callable-client-fragment.staff.gql'
export type { EmailMessageFragment } from './data/email-message-fragment/email-message-fragment.lens.gql.types'
export type { UserByEmailFragment } from './data/user-by-email-fragment'
export {
  EMAIL_ASSOCIATED_WITH_USER,
  ERROR_MESSAGE,
  REFRESH_CALLS_LIST
} from './messages'
export type { EmailContact, EmailMessageWithUsers } from './types'
