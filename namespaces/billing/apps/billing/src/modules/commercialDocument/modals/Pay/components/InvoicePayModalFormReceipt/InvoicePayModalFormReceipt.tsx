import { Container } from '@toptal/picasso'
import { FinalField } from '@toptal/picasso-forms'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { InvoicePendingReceiptPaymentMethods as PaymentMethods } from '@staff-portal/graphql/staff'
import { required } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

const displayName = 'InvoicePayModalFormReceipt'

const InvoicePayModalFormReceipt = memo(() => {
  const { t: translate } = useTranslation(['invoice', 'paymentMethod'])
  const { modalContainer } = useExternalIntegratorContext()

  const OPTIONS = Object.keys(PaymentMethods).map(key => {
    return {
      text: translate(
        `paymentMethod:${
          camelCase(key) as EnumKeysToCamelCase<typeof PaymentMethods>
        }` as const
      ),
      value: PaymentMethods[key as PaymentMethods]
    }
  })

  return (
    <Container data-testid={displayName}>
      <FinalField
        component={FormInputSelect}
        validate={required}
        required
        inputProps={{
          options: OPTIONS,
          enableReset: true,
          placeholder: translate(
            'invoice:payModal.fields.pendingReceipt.fields.paymentMethod.placeholder'
          ),
          popperContainer: modalContainer
        }}
        label={translate(
          'invoice:payModal.fields.pendingReceipt.fields.paymentMethod.label'
        )}
        name='pendingReceiptPaymentMethod'
        testId='pending-receipt-method'
      />

      <FinalField
        component={FormInputDatePicker}
        validate={required}
        required
        inputProps={{
          popperContainer: modalContainer
        }}
        label={translate(
          'invoice:payModal.fields.pendingReceipt.fields.date.label'
        )}
        name='pendingReceiptOn'
        testId='pending-receipt-date'
      />
    </Container>
  )
})

InvoicePayModalFormReceipt.displayName = displayName

export default InvoicePayModalFormReceipt
