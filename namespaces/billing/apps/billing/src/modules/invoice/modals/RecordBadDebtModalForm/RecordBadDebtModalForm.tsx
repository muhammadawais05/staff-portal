import { Container, Modal, Notification } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { RecordBadDebtInput } from '@staff-portal/graphql/staff'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'InvoiceRecordBadDebtModalForm'

interface Props {
  handleOnSubmit: (values: RecordBadDebtInput) => void
  initialValues: RecordBadDebtInput
  invoiceDocumentNumber: string
}

const InvoiceRecordBadDebtModalForm: FC<Props> = memo(
  ({ invoiceDocumentNumber, handleOnSubmit, initialValues }) => {
    const { t: translate } = useTranslation('invoice')

    return (
      <Form<RecordBadDebtInput>
        data-testid={displayName}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('recordBadDebtModal.title', { invoiceDocumentNumber })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Container bottom={2}>
            <Notification data-testid={`${displayName}-warning`}>
              {translate('recordBadDebtModal.confirmationMessage')}
            </Notification>
          </Container>
          <Form.Input
            autoFocus
            data-testid='comment'
            label={translate('recordBadDebtModal.fields.comment.label')}
            multiline
            name='comment'
            placeholder={translate(
              'recordBadDebtModal.fields.comment.placeholder'
            )}
            required
            rowsMin={4}
            width='full'
            validate={fieldValidators.required}
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('recordBadDebtModal.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

InvoiceRecordBadDebtModalForm.displayName = displayName

export default InvoiceRecordBadDebtModalForm
