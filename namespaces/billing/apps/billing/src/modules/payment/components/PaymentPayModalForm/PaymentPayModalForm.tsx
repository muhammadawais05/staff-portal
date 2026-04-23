import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import { GetPayModalPaymentQuery } from '../../modals/Pay/data/getPayModalPayment.graphql.types'
import PaymentPayModalFormContent from '../PaymentPayModalFormContent'

const displayName = 'PaymentPayModalForm'

interface Props {
  payment: Exclude<GetPayModalPaymentQuery['node'], null | undefined>
}

const PaymentPayModalForm: FC<Props> = memo(({ payment }) => {
  const { t: translate } = useTranslation('payment')
  const { balanceDue, documentNumber, eligibleForPay, subject } = payment

  return (
    <>
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('modals.pay.title', { documentNumber })}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <PaymentPayModalFormContent
          amount={balanceDue}
          subject={subject}
          isEligibleToBePaidOut={eligibleForPay}
          paymentMethodRequired
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton
          data-testid={`${displayName}-submit`}
          variant='positive'
        >
          {translate('form.pay.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </>
  )
})

PaymentPayModalForm.displayName = displayName

export default PaymentPayModalForm
