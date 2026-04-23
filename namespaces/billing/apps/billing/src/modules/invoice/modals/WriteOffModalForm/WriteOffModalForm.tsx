import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { WriteOffInvoiceInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'WriteOffModalForm'

interface Props {
  handleOnSubmit: (values: WriteOffInvoiceInput) => void
  initialValues: WriteOffInvoiceInput
  documentNumber: string
}

const WriteOffModalForm = ({
  initialValues,
  handleOnSubmit,
  documentNumber
}: Props) => {
  const { t: translate } = useTranslation('invoice')

  return (
    <Form<WriteOffInvoiceInput>
      data-testid={displayName}
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('writeOffModalForm.title', { documentNumber })}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Form.Input
          autoFocus
          data-testid='comment'
          label={translate('writeOffModalForm.fields.comment.label')}
          multiline
          name='comment'
          placeholder={translate(
            'writeOffModalForm.fields.comment.placeholder'
          )}
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('writeOffModalForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

WriteOffModalForm.displayName = displayName

export default memo(WriteOffModalForm)
