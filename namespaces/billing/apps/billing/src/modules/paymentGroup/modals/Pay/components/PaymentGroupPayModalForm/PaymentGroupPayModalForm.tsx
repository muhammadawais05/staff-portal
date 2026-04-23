import React from 'react'
import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter/ModalFooter'

import { GetPaymentGroupPayModalQuery } from '../../data'
import PaymentPayModalFormContent from '../../../../../payment/components/PaymentPayModalFormContent'

interface Props {
  paymentGroup: Exclude<GetPaymentGroupPayModalQuery['node'], null | undefined>
}

const displayName = 'PaymentGroupPayModalForm'

const PaymentGroupPayModalForm = ({ paymentGroup }: Props) => {
  const { t: translate } = useTranslation('paymentGroup')
  const { amount, eligibleForPay, number, subject } = paymentGroup

  return (
    <>
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('modals.pay.title', { number })}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <PaymentPayModalFormContent
          amount={amount}
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
          {translate('modals.pay.form.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </>
  )
}

export default PaymentGroupPayModalForm
