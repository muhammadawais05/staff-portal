import { Container, Form } from '@toptal/picasso'
import { FinalField } from '@toptal/picasso-forms'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { InvoicePaymentMethods as PaymentMethods } from '@staff-portal/graphql/staff'
import { required } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker'
import FormInputSelect from '@staff-portal/billing/src/components/FormInputSelect'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

const displayName = 'InvoicePayModalFormExternal'

const InvoicePayModalFormExternal = memo(() => {
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
      <Form.Field>
        <FinalField
          component={FormInputSelect}
          validate={required}
          inputProps={{
            options: OPTIONS,
            enableReset: true,
            placeholder: translate(
              'invoice:payModal.fields.record.fields.paymentMethod.placeholder'
            ),
            popperContainer: modalContainer
          }}
          label={translate(
            'invoice:payModal.fields.record.fields.paymentMethod.label'
          )}
          name='paymentMethod'
          required
          testId='external-payment-method'
        />
      </Form.Field>

      <Form.Field>
        <FinalField
          component={FormInputDatePicker}
          validate={required}
          inputProps={{
            popperContainer: modalContainer
          }}
          required
          label={translate('invoice:payModal.fields.record.fields.date.label')}
          name='date'
          testId='external-payment-date'
        />
      </Form.Field>
    </Container>
  )
})

InvoicePayModalFormExternal.displayName = displayName

export default InvoicePayModalFormExternal
