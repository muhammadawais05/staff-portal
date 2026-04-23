import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useCancelPaymentMutation } from './data/cancelPayment.graphql.types'
import CancelPaymentForm from '../../components/CancelPaymentForm'

interface Props {
  options: ModalData
}

const displayName = 'CancelPayment'

const CancelPayment = ({ options: { nodeId: documentNumber = '' } }: Props) => {
  const { t: translate } = useTranslation('payment')

  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [cancelPaymentMutation] = useCancelPaymentMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const initialValues = {
    paymentId: encodeId({ id: documentNumber, type: 'payment' }),
    comment: ''
  }
  const handleSuccess = handleOnSuccess({
    apolloEvent: ApolloContextEvents.paymentCancel,
    successMessage: translate('modals.cancelPayment.notification.success', {
      documentNumber
    })
  })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError('cancelPayment'),
    handleSuccess,
    responseKey: 'cancelPayment',
    submit: cancelPaymentMutation
  })

  return (
    <CancelPaymentForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      documentNumber={documentNumber}
    />
  )
}

CancelPayment.displayName = displayName

export default memo(CancelPayment)
