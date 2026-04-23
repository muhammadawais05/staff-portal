import React, { useCallback, useEffect, useState } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { Notification } from '@toptal/picasso'
import {
  ApplyUnallocatedMemorandumsToPaymentGroupInput,
  PaymentOptionPaymentMethod,
  PayPaymentGroupInput,
  ApplyUnallocatedMemorandumsToPaymentGroupPayload,
  PaymentGroupStatus
} from '@staff-portal/graphql/staff'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import * as OperationHelpers from '@staff-portal/billing/src/_lib/helpers/operations'
import AlertModal from '@staff-portal/billing/src/components/AlertModal'

import PaymentGroupApplyUnallocatedMemos from '../PaymentGroupApplyUnallocatedMemos/PaymentGroupApplyUnallocatedMemos'
import PaymentGroupPayModalForm from '../PaymentGroupPayModalForm'
import {
  GetPaymentGroupPayModalQuery,
  useSetPayPaymentGroupMutation
} from '../../data'

const mutationName = 'payPaymentGroup'

interface Props {
  paymentGroup: Exclude<GetPaymentGroupPayModalQuery['node'], null | undefined>
}

// eslint-disable-next-line max-statements
const PaymentGroupPayModalContent = ({ paymentGroup }: Props) => {
  const { t: translate } = useTranslation(['common', 'paymentGroup'])
  const [step, setStep] = useState('')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const { handleOnCloseModal } = useModals()
  const [payPaymentGroupMutation] = useSetPayPaymentGroupMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const { id, number, operations, status, subject } = paymentGroup
  const nodes = subject?.paymentOptions?.nodes || []
  const preferredPaymentOption = nodes.find(option => option.preferred)
  const applyUnallocatedMemosStep = 'apply-memos-step'
  const nextStep = ModalKey.paymentGroupPay
  const canApplyUnallocatedMemorandums = OperationHelpers.isOperationEnabled({
    key: 'applyUnallocatedMemorandums',
    operations
  })

  const handleStepCompleted = useCallback(
    (
      mutationInput?: ApplyUnallocatedMemorandumsToPaymentGroupInput,
      mutationResult?: ApplyUnallocatedMemorandumsToPaymentGroupPayload
    ) => {
      // close the modal if the invoice was fully paid by
      // applying memo(s)
      if (
        status !== PaymentGroupStatus.PAID &&
        mutationResult?.paymentGroup?.status === PaymentGroupStatus.PAID
      ) {
        handleOnCloseModal()
      } else {
        setStep(nextStep)
      }
    },
    [status, handleOnCloseModal, nextStep]
  )

  useEffect(() => {
    if (!canApplyUnallocatedMemorandums) {
      handleStepCompleted()
    } else if (step === '') {
      setStep(applyUnallocatedMemosStep)
    }
  }, [canApplyUnallocatedMemorandums, handleStepCompleted, step, setStep])

  if (step === applyUnallocatedMemosStep) {
    return (
      <PaymentGroupApplyUnallocatedMemos
        nodeId={id}
        onStepCompleted={handleStepCompleted}
      />
    )
  }

  const payPaymentGroupDisabled = OperationHelpers.isOperationDisabled({
    key: 'payPaymentGroup',
    operations
  })

  if (payPaymentGroupDisabled) {
    return (
      <AlertModal
        title={translate('paymentGroup:modals.pay.title', { number })}
        message={
          <Notification>
            {OperationHelpers.getOperationMessage(
              operations.payPaymentGroup.messages
            )}
          </Notification>
        }
      />
    )
  }

  const initialValues: PayPaymentGroupInput = {
    paymentGroupId: paymentGroup.id,
    paymentMethod:
      preferredPaymentOption?.paymentMethod ||
      PaymentOptionPaymentMethod.TOPTAL_PAYMENTS,
    comment: ''
  }

  return (
    <Form<PayPaymentGroupInput>
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit({
        handleError: handleOnSubmissionError(mutationName),
        handleSuccess: handleOnSuccess({
          apolloEvent: ApolloContextEvents.paymentGroupPay,
          successMessage: translate(
            'paymentGroup:modals.pay.notification.success',
            {
              number
            }
          )
        }),
        responseKey: mutationName,
        submit: payPaymentGroupMutation
      })}
    >
      <PaymentGroupPayModalForm paymentGroup={paymentGroup} />
    </Form>
  )
}

export default PaymentGroupPayModalContent
