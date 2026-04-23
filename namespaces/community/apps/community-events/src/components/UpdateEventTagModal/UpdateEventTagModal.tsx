import React, { useMemo } from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { FormCancelButton } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { EventTag } from '../../types'
import { useUpdateEventTag } from '../../data/update-event-tag/update-event-tag.staff.gql'

interface Props {
  hideModal: () => void
  eventTag: EventTag
}

interface FormValues {
  eventTagName: string
}

const UpdateEventTagModal = ({ hideModal, eventTag }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateEventTag] = useUpdateEventTag({
    onError() {
      showError('Unable to update event tag')
    }
  })

  const initialValues = useMemo(
    () => ({
      eventTagName: eventTag.title ?? ''
    }),
    [eventTag]
  )

  const handleSubmit = async (fields: FormValues) => {
    const { data } = await updateEventTag({
      variables: {
        input: {
          title: fields.eventTagName,
          id: eventTag.id,
          active: Boolean(eventTag.active)
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateCommunityEventTag,
      successNotificationMessage: `Event tag ${fields.eventTagName} successfully updated`,
      onSuccessAction() {
        hideModal()
      }
    })
  }

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (values.eventTagName === eventTag.title) {
      errors.eventTagName = 'You must change this value'
    }

    return errors
  }

  return (
    <Modal open onClose={hideModal} onBackdropClick={hideModal}>
      <ModalForm
        onSubmit={handleSubmit}
        title='Edit event tag'
        initialValues={initialValues}
        validate={validateForm}
      >
        <Modal.Content>
          <Form.Input
            name='eventTagName'
            width='full'
            placeholder='Type a name for event tag'
            data-testid='eventTagNameField'
          />
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton variant='positive'>Save</Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default UpdateEventTagModal
