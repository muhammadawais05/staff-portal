import { Container, Form, Tag, Typography } from '@toptal/picasso'
import { FinalField } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import {
  BillingMethodOption,
  sortByPrimaryAndNumericId
} from '@staff-portal/billing/src/_lib/helpers/billing'
import {
  composeValidators,
  futureDate,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { getCurrentTime } from '@staff-portal/billing/src/_lib/dateTime'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormInputDatePicker from '@staff-portal/billing/src/components/FormInputDatePicker'
import FormInputRadioGroup from '@staff-portal/billing/src/components/FormInputRadioGroup'

const displayName = 'InvoicePayModalFormCreditCard'

interface Props {
  options: BillingMethodOption[]
  hasOtherBillingMethods: boolean
}

const InvoicePayModalFormCreditCard: FC<Props> = memo(
  ({ options, hasOtherBillingMethods }) => {
    const { t: translate } = useTranslation(['invoice', 'common'])
    const { modalContainer } = useExternalIntegratorContext()

    const isSingleOption = options.length === 1
    const OPTIONS = options.sort(sortByPrimaryAndNumericId).map(option => {
      const { disabled, id, last4Digits, primary } = option
      const label = `**** **** **** ${last4Digits}`

      return {
        disabled,
        label: (
          <>
            {label}
            {primary && !isSingleOption && (
              <Container inline left='small'>
                <Tag variant='green'>{translate('common:primary')}</Tag>
              </Container>
            )}
          </>
        ),
        value: id
      }
    })

    const hint = hasOtherBillingMethods
      ? translate(
          'invoice:payModal.fields.creditCard.fields.info.alternativeHelp'
        )
      : translate('invoice:payModal.fields.creditCard.fields.info.defaultHelp')

    return (
      <Container data-testid={displayName}>
        {isSingleOption ? (
          <Form.Field hint={hint}>
            <Form.Label>
              {translate(
                'invoice:payModal.fields.creditCard.fields.info.label'
              )}
            </Form.Label>
            <Typography>{OPTIONS[0].label}</Typography>
          </Form.Field>
        ) : (
          <FinalField
            component={FormInputRadioGroup}
            label={translate(
              'invoice:payModal.fields.creditCard.fields.info.label'
            )}
            name='billingOptionId'
            options={OPTIONS}
            required
            testId='credit-card-payment-method'
            type='radio'
            validate={required}
          />
        )}

        <Form.Field>
          <FinalField
            component={FormInputDatePicker}
            required
            validate={composeValidators(required, futureDate)}
            inputProps={{
              minDate: getCurrentTime().toJSDate(),
              popperContainer: modalContainer
            }}
            label={translate(
              'invoice:payModal.fields.creditCard.fields.date.label'
            )}
            name='processingDate'
            testId='payment-processing-date'
          />
        </Form.Field>
      </Container>
    )
  }
)

InvoicePayModalFormCreditCard.displayName = displayName

export default InvoicePayModalFormCreditCard
