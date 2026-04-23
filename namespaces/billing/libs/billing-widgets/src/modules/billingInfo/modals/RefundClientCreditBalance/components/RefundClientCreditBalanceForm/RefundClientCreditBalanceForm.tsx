import { Container, Modal } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useCallback } from 'react'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { RefundClientCreditBalanceInput } from '@staff-portal/graphql/staff'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  amountCleanNumberValue,
  formatCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

const displayName = 'RefundClientCreditBalanceForm'

interface Props {
  handleOnSubmit: (values: RefundClientCreditBalanceInput) => void
  initialValues: RefundClientCreditBalanceInput
  clientName?: string
}

const RefundClientCreditBalanceForm: FC<Props> = memo(
  ({ handleOnSubmit, initialValues, clientName = '' }) => {
    const { t: translate } = useTranslation(['billingBasicInfo', 'common'])
    const amount = Number(initialValues.amount)

    const amountValidator = useCallback(
      newAmount =>
        Number(newAmount) > amount
          ? translate('common:validation.lessThanOrEqualValue', {
              label: formatAmount({ amount })
            })
          : undefined,
      [amount, translate]
    )

    if (amount === 0) {
      return (
        <>
          <Modal.Title data-testid={`${displayName}-title`}>
            {translate('billingBasicInfo:refundModal.title')}
          </Modal.Title>
          <Modal.Content data-testid={`${displayName}-zeroCreditBalance`}>
            {translate('billingBasicInfo:refundModal.zeroCreditBalance')}
          </Modal.Content>
        </>
      )
    }

    return (
      <Form<RefundClientCreditBalanceInput>
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('billingBasicInfo:refundModal.title')}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Input
            autoComplete='off'
            autoFocus
            data-testid={`${displayName}-amount`}
            format={formatCleanNumberValue}
            formatOnBlur
            icon={<ReferralBonus16 />}
            label={translate(
              'billingBasicInfo:refundModal.fields.amount.label'
            )}
            name='amount'
            parse={amountCleanNumberValue}
            placeholder='0.0'
            required
            validate={fieldValidators.composeValidators(
              fieldValidators.required,
              fieldValidators.positiveNumber,
              amountValidator
            )}
            width='full'
          />

          <Form.Input
            autoComplete='off'
            data-testid={`${displayName}-comment`}
            label={translate(
              'billingBasicInfo:refundModal.fields.comment.label'
            )}
            multiline
            name='comment'
            required
            rowsMin={4}
            width='full'
          />
          <Form.Checkbox
            data-testid={`${displayName}-notifyReceiver`}
            name='notifyReceiver'
            label={translate(
              'billingBasicInfo:refundModal.fields.notifyReceiver.label',
              {
                clientName
              }
            )}
          />
        </Modal.Content>
        <ModalFooter>
          <Container inline left={1}>
            <Form.SubmitButton data-testid='submit' variant='positive'>
              {translate('billingBasicInfo:refundModal.actions.submit')}
            </Form.SubmitButton>
          </Container>
        </ModalFooter>
      </Form>
    )
  }
)

RefundClientCreditBalanceForm.displayName = displayName

export default RefundClientCreditBalanceForm
