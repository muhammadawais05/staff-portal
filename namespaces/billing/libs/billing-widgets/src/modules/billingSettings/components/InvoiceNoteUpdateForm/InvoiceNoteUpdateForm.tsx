import React from 'react'
import { Container, Alert } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

const displayName = 'InvoiceNoteUpdateForm'

const InvoiceNoteUpdateForm = () => {
  const { t: translate } = useTranslation('billingSettings')

  return (
    <Container top='small' right='small' left='small'>
      <FormBaseErrorContainer />
      <Container bottom='small'>
        <Alert>{translate('forms.invoiceNote.fields.note.notice')}</Alert>
      </Container>
      <Form.Input
        autoFocus
        multiline
        placeholder={translate('forms.invoiceNote.fields.note.placeholder')}
        rowsMin={4}
        width='full'
        name='invoiceNote'
        data-testid={`${displayName}-invoice-note`}
      />
    </Container>
  )
}

InvoiceNoteUpdateForm.displayName = displayName

export default InvoiceNoteUpdateForm
