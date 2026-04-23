import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { DisputeTalentPaymentsInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

type InputValues = Omit<DisputeTalentPaymentsInput, 'commercialDocumentId'>

const displayName = 'InvoiceDisputeTalentModalForm'

interface Props {
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
  invoiceDocumentNumber: string
}

const InvoiceDisputeTalentModalForm: FC<Props> = memo(
  ({ invoiceDocumentNumber, handleOnSubmit, initialValues }) => {
    const { t: translate } = useTranslation('invoice')

    return (
      <Form<InputValues>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('disputeTalentModal.title', {
            documentNumber: invoiceDocumentNumber
          })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Container bottom={2}>
            <Typography size='medium' data-testid={`${displayName}-intro`}>
              {translate('disputeTalentModal.intro')}
            </Typography>
          </Container>

          <Form.Input
            autoFocus
            multiline
            placeholder={translate(
              'disputeTalentModal.fields.comment.placeholder'
            )}
            rowsMin={4}
            width='full'
            name='comment'
            data-testid='comment'
            label={translate('disputeTalentModal.fields.comment.label')}
            required
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('disputeTalentModal.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

InvoiceDisputeTalentModalForm.displayName = displayName

export default InvoiceDisputeTalentModalForm
