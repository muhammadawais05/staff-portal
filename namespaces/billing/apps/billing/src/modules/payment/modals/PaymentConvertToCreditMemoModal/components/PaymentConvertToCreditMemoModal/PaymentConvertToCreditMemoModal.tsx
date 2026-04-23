import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ConvertPaymentIntoCreditMemorandumInput } from '@staff-portal/graphql/staff'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useConvertPaymentIntoCreditMemorandumMutation } from '../../data'
import PaymentConvertToCreditMemoModalForm from '../PaymentConvertToCreditMemoModalForm'

const mutationName = 'convertPaymentIntoCreditMemorandum'
const displayName = 'PaymentConvertToCreditMemoModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

export const PaymentConvertToCreditMemoModal: FC<Props> = memo<Props>(
  ({ options: { nodeId, nodeType } }) => {
    const paymentId = encodeId({
      id: nodeId,
      type: nodeType
    })
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()

    const { t: translate } = useTranslation('payment')

    const variables: Pick<
      ConvertPaymentIntoCreditMemorandumInput,
      'paymentId'
    > = {
      paymentId
    }

    const [convertPaymentIntoCreditMemorandumMutation] =
      useConvertPaymentIntoCreditMemorandumMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const initialValues = {
      comment: ''
    }

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(mutationName),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.convertPaymentIntoCreditMemorandum,
        outboundEvent: {
          key: ApolloContextEvents.convertPaymentIntoCreditMemorandum
        },
        successMessage: translate(
          'modals.convertToCreditMemo.notification.success'
        )
      }),
      responseKey: mutationName,
      submit: convertPaymentIntoCreditMemorandumMutation,
      variables
    })

    return (
      <PaymentConvertToCreditMemoModalForm
        paymentId={paymentId}
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
      />
    )
  }
)

PaymentConvertToCreditMemoModal.displayName = displayName

export default PaymentConvertToCreditMemoModal
