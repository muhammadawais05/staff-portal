import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@toptal/picasso-forms'
import {
  ApplyUnallocatedMemorandumsToCommercialDocumentInput,
  DocumentStatus,
  ApplyUnallocatedMemorandumsToCommercialDocumentPayload,
  PayPaymentInput
} from '@staff-portal/graphql/staff'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import * as OperationHelpers from '@staff-portal/billing/src/_lib/helpers/operations'
import AlertModal from '@staff-portal/billing/src/components/AlertModal/AlertModal'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import ApplyUnallocatedMemorandums from '../../../../../commercialDocument/modals/ApplyUnallocatedMemorandums'
import PaymentPayModalForm from '../../../../components/PaymentPayModalForm'
import { useSetPayPaymentMutation, GetPayModalPaymentQuery } from '../../data'

interface Props {
  payment: Exclude<GetPayModalPaymentQuery['node'], null | undefined>
}

const displayName = 'PaymentPayModalContent'
const responseKey = 'payPayment'

const PaymentPayModalContent = ({ payment }: Props) => {
  const { t: translate } = useTranslation(['common', 'payment'])
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const { handleOnCloseModal } = useModals()
  const [payPaymentMutation] = useSetPayPaymentMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { documentNumber, id, operations, status, subject } = payment

  const nextModal = ModalKey.paymentPay

  const canApplyUnallocatedMemorandums = OperationHelpers.isOperationEnabled({
    key: 'applyUnallocatedMemorandumsToCommercialDocument',
    operations
  })

  const paymentIsPayable = OperationHelpers.isOperationEnabled({
    key: 'payPayment',
    operations
  })

  const [modal, setModal] = useState(
    canApplyUnallocatedMemorandums ? ModalKey.paymentApplyMemos : ''
  )

  const handleOnNextModal = useCallback(
    (
      mutationInput?: ApplyUnallocatedMemorandumsToCommercialDocumentInput,
      mutationResult?: ApplyUnallocatedMemorandumsToCommercialDocumentPayload
    ) => {
      // close the modal if the invoice was fully covered by
      // applying memos or prepayments
      if (
        status !== DocumentStatus.PAID &&
        mutationResult?.commercialDocument?.status === DocumentStatus.PAID
      ) {
        handleOnCloseModal()
      } else {
        setModal(nextModal)
      }
    },
    [handleOnCloseModal, status, nextModal]
  )

  useEffect(() => {
    if (!canApplyUnallocatedMemorandums) {
      handleOnNextModal()
    } else if (modal === '') {
      setModal(ModalKey.paymentApplyMemos)
    }
  }, [canApplyUnallocatedMemorandums, handleOnNextModal, modal, setModal])

  if (modal === ModalKey.paymentApplyMemos) {
    return (
      <ApplyUnallocatedMemorandums
        isApplyMemosAndPayFlow
        commercialDocumentId={id}
        onStepCompleted={handleOnNextModal}
      />
    )
  }

  if (!paymentIsPayable) {
    return (
      <AlertModal
        message={operations.payPayment.messages.join(' ')}
        title={translate('payment:modals.pay.title', { documentNumber })}
      />
    )
  }

  const nodes = subject?.paymentOptions?.nodes || []
  const preferredPaymentOption = nodes.find(option => option.preferred)
  const initialValues: Partial<PayPaymentInput> = {
    paymentMethod: preferredPaymentOption?.paymentMethod,
    paymentId: id,
    comment: ''
  }

  return (
    <Form<PayPaymentInput>
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit({
        handleError: handleOnSubmissionError(responseKey),
        handleSuccess: handleOnSuccess({
          apolloEvent: ApolloContextEvents.paymentPay,
          successMessage: translate('payment:modals.pay.notification.success', {
            documentNumber
          })
        }),
        responseKey,
        submit: payPaymentMutation
      })}
    >
      <PaymentPayModalForm payment={payment} />
    </Form>
  )
}

PaymentPayModalContent.displayName = displayName

export default PaymentPayModalContent
