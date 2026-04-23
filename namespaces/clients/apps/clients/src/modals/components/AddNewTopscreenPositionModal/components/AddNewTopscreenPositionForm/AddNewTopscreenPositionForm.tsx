import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CreateTopscreenPositionInput } from '@staff-portal/graphql/staff'
import {
  TOPSCREEN_STEP_TYPE_OPTIONS,
  TOPSCREEN_POSITION_CREATED
} from '@staff-portal/clients'
import { isMaxLength } from '@staff-portal/validators'

import { AddNewTopscreenPositionDocument } from '../../data/add-new-topscreen-position/add-new-topscreen-position.staff.gql.types'
interface Props {
  topscreenClientId: string
  hideModal: () => void
}

const AddNewTopscreenPositionForm = ({
  topscreenClientId,
  hideModal
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: AddNewTopscreenPositionDocument,
    mutationResultOptions: {
      successNotificationMessage: 'You created a new TopScreen position.',
      successMessageEmitOptions: {
        type: TOPSCREEN_POSITION_CREATED,
        payload: { topscreenClientId }
      },
      onSuccessAction: hideModal
    }
  })

  const handleFormValuesAndSubmit = (
    formData: CreateTopscreenPositionInput
  ) => {
    return handleSubmit(formData)
  }

  return (
    <ModalForm<CreateTopscreenPositionInput>
      title='Create New TopScreen Position'
      initialValues={{ topscreenClientId }}
      onSubmit={handleFormValuesAndSubmit}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Once you create the position, the related step MPBs and email
            templates should be configured as well.
          </Typography>
        </Container>
        <Form.Input
          required
          autoFocus
          width='full'
          name='title'
          label='Title'
          placeholder='eg. Backend Engineer'
          validate={isMaxLength}
          data-testid='add-new-position-title'
        />
        <Form.Input
          required
          width='full'
          name='description'
          label='Programming Language'
          validate={isMaxLength}
          data-testid='add-new-position-programming-language'
        />
        <Form.Input
          required
          width='full'
          name='jobUrl'
          label='Job Url'
          placeholder='https://'
          validate={isMaxLength}
        />
        <Form.Input
          required
          width='full'
          name='contactName'
          label='Contact Name'
          validate={isMaxLength}
        />
        <Form.Input
          required
          width='full'
          name='contactEmail'
          label='Contact Email'
          validate={isMaxLength}
        />
        <Form.CheckboxGroup
          required
          width='full'
          name='stepTypes'
          label='Screening Steps'
        >
          {TOPSCREEN_STEP_TYPE_OPTIONS.map(stepType => (
            <Form.Checkbox
              key={stepType.value}
              label={stepType.label}
              value={stepType.value}
              titleCase={false}
              data-testid={`add-new-position-${stepType.label}`}
            />
          ))}
        </Form.CheckboxGroup>
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>

        <Form.SubmitButton variant='positive'>Create</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default AddNewTopscreenPositionForm
