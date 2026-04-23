import { Container, FormLabel, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { CollectBadDebtInvoiceInput } from '@staff-portal/graphql/staff'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  amountCleanNumberValue,
  formatCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
const displayName = 'InvoiceCollectBadDebtModalForm'

interface Props {
  handleOnSubmit: (values: CollectBadDebtInvoiceInput) => void
  initialValues: CollectBadDebtInvoiceInput
  invoiceDocumentNumber: number
}

const InvoiceCollectBadDebtModalForm: FC<Props> = memo(
  ({ handleOnSubmit, initialValues, invoiceDocumentNumber }) => {
    const { t: translate } = useTranslation('invoice')

    return (
      <Form<CollectBadDebtInvoiceInput>
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('collectBadDebtModal.title', { invoiceDocumentNumber })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer
            // The error can also be returned as a field-level error because
            // the final, calculated amount is validated in scope of a transfer
            fieldErrorKeys={['amount']}
          />
          <Container bottom={2}>
            <Typography size='medium' data-testid={`${displayName}-intro`}>
              {translate('collectBadDebtModal.description')}
            </Typography>
          </Container>

          <Form.Input
            autoComplete='off'
            autoFocus
            data-testid={`${displayName}-transferAmount`}
            format={formatCleanNumberValue}
            formatOnBlur
            icon={<ReferralBonus16 />}
            label={translate('collectBadDebtModal.fields.transferAmount.label')}
            name='transferAmount'
            parse={amountCleanNumberValue}
            placeholder='0.0'
            required
            // The final amount is validated on the BE in scope of a transfer;
            // the logic is too complex to be included in the FE
            // https://github.com/toptal/platform/blob/7bcd6d0252aa91dcb22f433233166ec63dc447d2/
            // apq/actions/ba/invoice/create_transfer/processors/base_processor.rb#L43
            validate={fieldValidators.composeValidators(
              fieldValidators.required,
              fieldValidators.positiveNumber
            )}
            width='full'
          />
          <Container bottom={1} top={1}>
            <FormLabel>
              {translate('collectBadDebtModal.paymentMethodLabel')}
            </FormLabel>
            <Typography size='medium' weight='semibold'>
              {translate('collectBadDebtModal.paymentMethodValue')}
            </Typography>
          </Container>

          <Form.Input
            autoComplete='off'
            data-testid={`${displayName}-feeAmount`}
            format={formatCleanNumberValue}
            formatOnBlur
            icon={<ReferralBonus16 />}
            label={translate('collectBadDebtModal.fields.feeAmount.label')}
            name='feeAmount'
            parse={amountCleanNumberValue}
            placeholder='0.0'
            required
            validate={(value = '') => fieldValidators.required(value)}
            width='full'
          />
          <Form.Input
            autoComplete='off'
            data-testid={`${displayName}-comment`}
            label={translate('collectBadDebtModal.fields.comment.label')}
            multiline
            name='comment'
            placeholder={translate(
              'collectBadDebtModal.fields.comment.placeholder'
            )}
            required
            rowsMin={4}
            validate={(value: CollectBadDebtInvoiceInput['comment']) =>
              value
                ? undefined
                : translate(
                    'collectBadDebtModal.fields.comment.validationError'
                  )
            }
            width='full'
          />
        </Modal.Content>
        <ModalFooter>
          <Container inline left={1}>
            <Form.SubmitButton data-testid='submit' variant='positive'>
              {translate('collectBadDebtModal.actions.submit')}
            </Form.SubmitButton>
          </Container>
        </ModalFooter>
      </Form>
    )
  }
)

InvoiceCollectBadDebtModalForm.displayName = displayName

export default InvoiceCollectBadDebtModalForm
