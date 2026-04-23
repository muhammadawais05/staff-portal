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

import { useCancelPaymentGroupMutation } from './data/cancelPaymentGroup.graphql.types'
import CancelPaymentGroupForm from '../../components/CancelPaymentGroupForm'

interface Props {
  options: ModalData
}

const displayName = 'CancelPaymentGroupModal'

const CancelPaymentGroupModal = ({
  options: { nodeId: paymentGroupNumber = '' }
}: Props) => {
  const { t: translate } = useTranslation('paymentGroup')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [cancelPaymentGroupMutation] = useCancelPaymentGroupMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const initialValues = {
    paymentGroupId: encodeId({ id: paymentGroupNumber, type: 'paymentGroup' }),
    comment: ''
  }
  const handleSuccess = handleOnSuccess({
    apolloEvent: ApolloContextEvents.paymentGroupCancel,
    successMessage: translate(
      'modals.cancelPaymentGroup.notification.success',
      {
        number: paymentGroupNumber
      }
    )
  })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError('cancelPaymentGroup'),
    handleSuccess,
    responseKey: 'cancelPaymentGroup',
    submit: cancelPaymentGroupMutation
  })

  return (
    <CancelPaymentGroupForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      paymentGroupNumber={paymentGroupNumber}
    />
  )
}

CancelPaymentGroupModal.displayName = displayName

export default memo(CancelPaymentGroupModal)
