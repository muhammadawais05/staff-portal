import { FormCancelButton } from '@staff-portal/forms'
import { NodeType } from '@staff-portal/graphql'
import {
  NextCheckActions,
  NextCheckResponsibleRoleTypes as ResponsibleRoleTypes,
  Scalars
} from '@staff-portal/graphql/staff'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Form } from '@toptal/picasso-forms'
import React, { useCallback } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TASK_UPDATED } from '@staff-portal/tasks'

import ScheduleNextCheckFormInputs, {
  isActionNeeded
} from '../ScheduleNextCheckFormInputs'
import { ScheduleTaskNextCheckDocument } from './data'

export interface Props {
  taskId: string
  hideModal: () => void
  onScheduleTaskNextCheck: () => void
}

interface ScheduleTaskNextCheckForm {
  actionNeeded: string
  actionDate: Scalars['Date']
  responsibleRoleType?: ResponsibleRoleTypes
  action?: NextCheckActions
  comment?: string
}

const getMutationInput = (
  taskId: string,
  formValues: ScheduleTaskNextCheckForm
) => {
  const actionNeeded = isActionNeeded(formValues.actionNeeded)
  const transformedValues = {
    actionNeeded
  }

  if (actionNeeded) {
    return { taskId, ...formValues, ...transformedValues }
  }

  // Send only actionNeeded & actionDate fields.
  return { taskId, actionDate: formValues.actionDate, ...transformedValues }
}

const ScheduleNextCheckModal = ({
  taskId,
  hideModal,
  onScheduleTaskNextCheck
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { handleSubmit: handleMutationSubmit } = useModalFormChangeHandler({
    mutationDocument: ScheduleTaskNextCheckDocument,
    mutationResultOptions: {
      successNotificationMessage: 'The Next Check was scheduled.',
      onSuccessAction: () => {
        onScheduleTaskNextCheck()
        hideModal()
        emitMessage(TASK_UPDATED, { taskId })
      }
    },
    errorNotificationMessage:
      'An error occurred, the next check was not scheduled.'
  })

  const handleSubmit = useCallback(
    (formValues: ScheduleTaskNextCheckForm) =>
      handleMutationSubmit(getMutationInput(taskId, formValues)),
    [handleMutationSubmit, taskId]
  )

  return (
    <Modal
      open
      size='small'
      operationVariables={{
        nodeId: taskId,
        nodeType: NodeType.TASK,
        operationName: 'scheduleTaskNextCheck'
      }}
      onClose={hideModal}
    >
      <ModalForm title='Schedule Next Check' onSubmit={handleSubmit}>
        <Modal.Content>
          <ScheduleNextCheckFormInputs />
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />

          <Form.SubmitButton variant='positive'>
            Schedule Check
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ScheduleNextCheckModal
