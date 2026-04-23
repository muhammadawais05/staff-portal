import { Amount, Button, Container, Form, Modal } from '@toptal/picasso'
import { FinalField, OnChange, FormRenderProps } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useCallback } from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import { ApplyPrepaymentsInput, Maybe } from '@staff-portal/graphql/staff'
import {
  cleanNumberValue,
  onBlurToFloatNumber
} from '@staff-portal/billing/src/_lib/form/handlers'
import {
  composeValidators,
  positiveNumber,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import FormInput from '@staff-portal/billing/src/components/FormInput'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'InvoiceApplyPrepaymentsModalForm'

interface Props {
  formProps: FormRenderProps<ApplyPrepaymentsInput>
  availablePrepaymentBalance?: string
  cleanAmountToPay?: Maybe<string>
  documentNumber?: number
}

const InvoiceApplyPrepaymentsModalForm: FC<Props> = memo(
  ({
    availablePrepaymentBalance,
    cleanAmountToPay,
    documentNumber,
    formProps: {
      form: { change, getState },
      handleSubmit
    }
  }) => {
    const { t: translate } = useTranslation(['common', 'invoice'])
    const { submitting } = getState()

    const cleanAmount = Number(cleanAmountToPay)
    const availableBalance = Number(availablePrepaymentBalance)

    const balanceValidator = useCallback(
      value => {
        if (Number(value) > availableBalance) {
          return translate('common:validation.lessThanOrEqualValue', {
            label: formatAmount({ amount: availableBalance })
          })
        }
      },
      [availableBalance, translate]
    )

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('invoice:applyPrepaymentsModal.title', { documentNumber })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Container bottom={2}>
            <Form.Field>
              <Form.Label>Due amount</Form.Label>
              <Amount
                amount={cleanAmount}
                data-testid={`${displayName}-dueAmount`}
              />
            </Form.Field>
            <Form.Field>
              <Form.Label>Available prepayments</Form.Label>
              <Amount
                amount={availableBalance}
                data-testid={`${displayName}-availablePrepayments`}
              />
            </Form.Field>
            <Form.Field>
              <FinalField
                component={FormInput}
                handleOnBlur={onBlurToFloatNumber}
                inputProps={{
                  autoComplete: 'off',
                  autoFocus: true,
                  icon: <span>$</span>,
                  placeholder: '0.00'
                }}
                label={translate('invoice:applyPrepaymentsModal.amount')}
                name='amount'
                testId={`${displayName}-amount`}
                required
                validate={composeValidators(
                  required,
                  positiveNumber,
                  balanceValidator
                )}
              />
              {/* TODO: use solution https://github.com/toptal/billing-frontend/pull/1595/files
                      format={formatCleanNumberValue}
                      formatOnBlur */}
              <OnChange name='amount'>
                {(value: string) => {
                  const cleanedValue = cleanNumberValue(value)

                  if (value !== cleanedValue) {
                    change('amount', cleanedValue)
                  }
                }}
              </OnChange>
            </Form.Field>
          </Container>
        </Modal.Content>
        <ModalFooter>
          <Button
            data-testid={`${displayName}-submit`}
            disabled={submitting}
            loading={submitting}
            type='submit'
            variant='positive'
          >
            {translate('invoice:applyPrepaymentsModal.submitButton')}
          </Button>
        </ModalFooter>
      </form>
    )
  }
)

InvoiceApplyPrepaymentsModalForm.displayName = displayName

export default InvoiceApplyPrepaymentsModalForm
