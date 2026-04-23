import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useMemo, useCallback } from 'react'
import {
  FeedbackReasonActions,
  TaskPriorityLevel,
  PauseClientInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { FormReasonSelect } from '@staff-portal/feedbacks'
import { NodeType } from '@staff-portal/graphql'
import { FormTaskTagSelector, TASK_PRIORITY_OPTIONS } from '@staff-portal/tasks'

import { PauseClientDocument } from './data'
import { CLIENT_UPDATED } from '../../messages'

export interface Props {
  clientId: string
  hideModal: () => void
  onSuccess: () => void
}

type TagType = { node: { id?: string } }
const TITLE = 'Pause Company'

const PauseClientModal = ({ clientId, hideModal, onSuccess }: Props) => {
  const minDate = useMemo(() => new Date(), [])

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: PauseClientDocument,
      mutationResultOptions: {
        onSuccessAction: () => {
          hideModal()
          onSuccess()
        },
        successNotificationMessage: 'Company has been paused.',
        successMessageEmitOptions: {
          type: CLIENT_UPDATED,
          payload: { companyId: clientId }
        }
      }
    })

  const handleSubmit = useCallback(
    ({ tags, ...rest }) =>
      handleMutationSubmit({
        clientId,
        ...rest,
        tagIds: tags?.map(({ node }: TagType) => node?.id ?? '').filter(Boolean)
      }),
    [clientId, handleMutationSubmit]
  )

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'pauseClient'
      }}
      defaultTitle={TITLE}
    >
      <ModalForm<PauseClientInput> onSubmit={handleSubmit} title={TITLE}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to pause this company?
            </Typography>
          </Container>

          <Form.Input
            label='Custom task description'
            placeholder='Leave empty to set default description'
            width='full'
            name='description'
            autoFocus
          />

          <FormDatePickerWrapper
            name='dueDate'
            label='Due date'
            width='full'
            minDate={minDate}
            required
          />

          <Form.Select
            name='priority'
            label='Priority'
            options={TASK_PRIORITY_OPTIONS}
            width='full'
            initialValue={TaskPriorityLevel.MEDIUM}
          />

          <FormTaskTagSelector name='tags' label='Tags' width='full' />

          <FormReasonSelect
            action={FeedbackReasonActions.COMPANY_PAUSED}
            required
            width='full'
            name='reasonId'
            label='Reason'
          />

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Details'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Pause Company
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default PauseClientModal
