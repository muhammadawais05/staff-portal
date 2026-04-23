import React, { useCallback } from 'react'
import {
  ModalComponentBaseProps,
  PromptModal
} from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { DestroyEmailTemplateDocument } from '../../data/destroy-email-template/destroy-email-template.staff.gql.types'
import { EMAIL_TEMPLATE_UPDATED } from '../../messages'

interface Props extends ModalComponentBaseProps {
  emailTemplateId: string
  emailTemplateTitle: string
}

const DestroyEmailTemplateModal = ({
  emailTemplateId,
  emailTemplateTitle,
  hideModal
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: DestroyEmailTemplateDocument,
      mutationResultOptions: {
        successNotificationMessage:
          'The Email Template was successfully deleted.',
        onSuccessAction: () => {
          emitMessage(EMAIL_TEMPLATE_UPDATED, { emailTemplateId })
          hideModal()
        }
      },
      errorNotificationMessage:
        'There was an error and the Email Template could not be deleted.'
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ emailTemplateId }),
    [handleMutationSubmit, emailTemplateId]
  )

  return (
    <PromptModal
      open
      operationVariables={{
        nodeId: emailTemplateId,
        nodeType: NodeType.EMAIL_TEMPLATE,
        operationName: 'destroyEmailTemplate'
      }}
      title='Delete Email Template'
      message={`Are you sure that you want to delete the "${emailTemplateTitle}" email template?`}
      submitText='Delete Email Template'
      variant='negative'
      onClose={hideModal}
      onSubmit={handleSubmit}
      loading={loading}
      data-testid='DestroyEmailTemplate-modal'
      testIds={{
        submitButton: 'DestroyEmailTemplate-modal-submit-button'
      }}
    />
  )
}

export default DestroyEmailTemplateModal
