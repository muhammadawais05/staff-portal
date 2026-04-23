import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { UnconsolidateInvoiceInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'UnconsolidateModalForm'

interface Props {
  handleOnSubmit: (values: UnconsolidateInvoiceInput) => void
  initialValues: UnconsolidateInvoiceInput
  documentNumber: string
}

const UnconsolidateModalForm = ({
  initialValues,
  handleOnSubmit,
  documentNumber
}: Props) => {
  const { t: translate } = useTranslation('invoice')

  return (
    <Form<UnconsolidateInvoiceInput>
      data-testid={displayName}
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('unconsolidateModalForm.title', { documentNumber })}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Form.Input
          autoFocus
          data-testid='comment'
          label={translate('unconsolidateModalForm.fields.comment.label')}
          multiline
          name='comment'
          placeholder={translate(
            'unconsolidateModalForm.fields.comment.placeholder'
          )}
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('unconsolidateModalForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

UnconsolidateModalForm.displayName = displayName

export default memo(UnconsolidateModalForm)
