import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { identity } from 'lodash-es'
import { EditDocumentNoteInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

interface Props {
  nodeId: string
  nodeType: CommercialDocumentType
  isCreate?: boolean
  handleOnSubmit: (values: EditDocumentNoteInput) => void
  initialValues: EditDocumentNoteInput
}

const displayName = 'EditDocumentNoteForm'

const EditDocumentNoteForm = ({
  nodeId,
  nodeType,
  isCreate,
  initialValues,
  handleOnSubmit
}: Props) => {
  const { t: translate } = useTranslation(['commercialDocument', 'common'])
  const variant = isCreate ? 'create' : 'update'
  const baseString = 'commercialDocument:modals.editDocumentNote'
  const title = translate(
    `${baseString}.title.${variant}.${nodeType}` as const,
    {
      documentNumber: nodeId
    }
  )
  const placeholder = translate(
    `${baseString}.documentNote.placeholder.${nodeType}` as const
  )

  return (
    <Form<EditDocumentNoteInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Form.Input
          autoFocus
          multiline
          placeholder={placeholder}
          rowsMin={4}
          width='full'
          name='note'
          data-testid={`${displayName}-note`}
          // react-final-form will remove `note` value from form values, if it's empty,
          // to cancel that behavior, we have to override field value parse
          // @see https://github.com/final-form/react-final-form/issues/430
          // @see https://github.com/final-form/react-final-form/issues/130
          parse={identity}
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate(`common:actions.${variant}` as const)}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

EditDocumentNoteForm.displayName = displayName

export default memo(EditDocumentNoteForm)
