import { Config } from '@toptal/picasso-forms'
import React, { ReactNode, useCallback, useState } from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import {
  MutationResult,
  UseChangeHandlerProps,
  useModalFormChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import {
  SendEmailFormValues,
  SendEmailFormValuesToAdjust
} from '../SendEmailForm'
import { EmailContext } from '../../types'
import BookingObjectField from '../BookingObjectField'
import EmailTemplatesField from '../EmailTemplatesField'
import SubjectField from '../SubjectField'
import ToField from '../ToField'
import CCSuggestedField from '../CCSuggestedField'
import CCAdditionalField from '../CCAdditionalField'
import CCExternalField from './components/CCExternalField'
import EmailBodyField from '../EmailBodyField'
import SendEmailPendingTasks from '../SendEmailPendingTasks'
import OfacStatusNotification from '../OfacStatusNotification'
import GoogleAppsAuthNotification from '../GoogleAppsAuthNotification'
import LatestEmailMessageSection from '../LatestEmailMessageSection'

const SendEmailModalContent = lazy(
  () => import('../SendEmailModalContent/SendEmailModalContent')
)

export interface Props<
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>
> {
  children: (data: { emailContext: EmailContext | undefined }) => ReactNode
  nodeId: string
  queryHook: (parameters: { nodeId: string; onCompleted?: () => void }) => {
    emailContext?: EmailContext | null
    loading: boolean
    refetchEmailContext: () => void
  }
  mutationDocument: UseChangeHandlerProps<
    TMutationResponse,
    TMutationResult,
    TMutationInput,
    Partial<TMutationInput>,
    TypedMessage<unknown>
  >['mutationDocument']
  mutationResult: keyof TMutationResponse
  operationVariables?: GetLazyOperationVariables | undefined
  adjustFormValues: (formValues: SendEmailFormValuesToAdjust) => TMutationInput
  preselectedEmailTemplateId?: string | null
  scheduledSend?: boolean
  hideModal: () => void
  onCompleted?: (formValues: TMutationResponse) => void
}

const SendEmailModal = <
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>
>({
  children,
  nodeId,
  queryHook,
  mutationDocument,
  mutationResult,
  operationVariables,
  adjustFormValues,
  preselectedEmailTemplateId,
  scheduledSend,
  hideModal,
  onCompleted
}: Props<TMutationResponse, TMutationResult, TMutationInput>) => {
  const { emailContext, refetchEmailContext, loading } = queryHook({
    nodeId,
    onCompleted: () => {
      setContext(emailContext)
    }
  })

  const [context, setContext] = useState(emailContext)

  const { handleSubmit: handleMutationSubmit } = useModalFormChangeHandler({
    mutationDocument,
    mutationResultOptions: {
      successNotificationMessage: ({ onTime }) => {
        if (typeof onTime === 'string') {
          return `The email will be sent on ${parseAndFormatDate(onTime)}.`
        }

        return 'The email was successfully sent.'
      }
    },
    onCompleted: data => {
      if (data[mutationResult]?.success) {
        hideModal()
        refetchEmailContext()
        onCompleted?.(data)
      }
    }
  })

  const handleSubmit: Config<SendEmailFormValues>['onSubmit'] = useCallback(
    async data => {
      const { to, ...rest } = data

      if (!to) {
        throw new Error('Cannot find "Send To" option')
      }

      return handleMutationSubmit(
        adjustFormValues({
          ...rest,
          to
        })
      )
    },
    [handleMutationSubmit, adjustFormValues]
  )

  const templateId =
    preselectedEmailTemplateId ?? context?.emailTemplates?.edges[0].node.id

  return (
    <Modal
      onClose={hideModal}
      open
      size='large'
      operationVariables={operationVariables}
      data-testid='send-email-modal'
    >
      {!loading && context ? (
        <SendEmailModalContent
          emailContext={context}
          preselectedEmailTemplateId={templateId}
          scheduledSend={scheduledSend}
          handleSubmit={handleSubmit}
          hideModal={hideModal}
        >
          {children({ emailContext: context })}
        </SendEmailModalContent>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

SendEmailModal.BookingObjectField = BookingObjectField
SendEmailModal.EmailTemplatesField = EmailTemplatesField
SendEmailModal.SubjectField = SubjectField
SendEmailModal.ToField = ToField
SendEmailModal.CCSuggestedField = CCSuggestedField
SendEmailModal.CCAdditionalField = CCAdditionalField
SendEmailModal.CCExternalField = CCExternalField
SendEmailModal.EmailBodyField = EmailBodyField
SendEmailModal.SendEmailPendingTasks = SendEmailPendingTasks
SendEmailModal.OfacStatusNotification = OfacStatusNotification
SendEmailModal.GoogleAppsAuthNotification = GoogleAppsAuthNotification
SendEmailModal.LatestEmailMessageSection = LatestEmailMessageSection

export default SendEmailModal
