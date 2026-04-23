import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { CreateNoteInput, UpdateNoteInput } from '@staff-portal/graphql/staff'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import NoteEditModalFormAttachment from '../NoteEditModalFormAttachment'

const displayName = 'NoteEditModalForm'

type NoteInput =
  | Omit<UpdateNoteInput, 'noteId'>
  | Omit<CreateNoteInput, 'notableId'>

interface Props {
  handleOnSubmit: (values: NoteInput) => void
  initialValues: NoteInput
  isEdit?: boolean
}

const NoteEditModalForm: FC<Props> = memo(
  ({ handleOnSubmit, initialValues, isEdit = false }) => {
    const { t: translate } = useTranslation('notes')

    return (
      <Form<NoteInput>
        data-testid={displayName}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate(`form.title.${isEdit ? 'edit' : 'create'}` as const)}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Input
            autoFocus
            name='title'
            data-testid='title'
            label={translate('form.titleField')}
            placeholder={translate('form.titleField')}
            required
            width='full'
            validate={fieldValidators.required}
          />

          <Form.Input
            name='comment'
            data-testid='comment'
            label={translate('form.comment')}
            placeholder={translate('form.commentField')}
            required
            multiline
            rowsMin={4}
            width='full'
            validate={fieldValidators.required}
          />

          <NoteEditModalFormAttachment />
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate(`actions.${isEdit ? 'edit' : 'create'}` as const)}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

NoteEditModalForm.displayName = displayName

export default NoteEditModalForm
