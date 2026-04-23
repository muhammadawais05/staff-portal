export { useSendEmailModal } from './hooks/use-send-email-modal'
export * from './types'
export { SendEmailProvider } from './context/send-email-context'

export {
  EmailPreview,
  SendClientOrRoleEmailItem,
  SendEmailActionItem,
  SendEmailModal,
  useGetGeneralEmailContext
} from './components'
export type {
  EmailPreviewProps,
  SendEmailFormValues,
  SendEmailFormValuesToAdjust,
  SendEmailModalProps
} from './components'

export { processEmailBody } from './utils'

export {
  EMAIL_MESSAGING_FRAGMENT,
  ROLE_RECIPIENT_FRAGMENT
} from './data/fragments/email-messaging-fragment.staff.gql'
