import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ApplyUnallocatedMemorandumsToPaymentGroupInput,
  ApplyUnallocatedMemorandumsToPaymentGroupPayload
} from '@staff-portal/graphql/staff'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import { UnallocatedMemorandumNodesFragment } from '../../../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import adjustValues from './adjustValues'
import {
  ApplyUnallocatedMemorandumsFormValues,
  StepCompleted
} from '../PaymentGroupApplyUnallocatedMemos/PaymentGroupApplyUnallocatedMemos'
import { useSetApplyUnallocatedMemorandumsToPaymentGroupMutation } from '../../data'
import ApplyUnallocatedMemorandumsForm from '../../../../components/ApplyUnallocatedMemorandumsForm'

const displayName = 'PaymentGroupApplyUnallocatedMemosContent'
const responseKey = 'applyUnallocatedMemorandumsToPaymentGroup'

interface PaymentGroup {
  number: number
  id: string
  subject: {
    id: string
    unallocatedMemorandums: UnallocatedMemorandumNodesFragment
  }
}

interface ContentProps {
  paymentGroup: PaymentGroup
  onStepCompleted: StepCompleted
}

const PaymentGroupApplyUnallocatedMemosContent = ({
  paymentGroup: {
    id: nodeId,
    subject: { unallocatedMemorandums }
  },
  onStepCompleted
}: ContentProps) => {
  const { t: translate } = useTranslation('paymentGroup')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const [applyUnallocatedMemorandumsMutation] =
    useSetApplyUnallocatedMemorandumsToPaymentGroupMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const { id } = decodeRawIdAndType(nodeId)

  const initialValues: ApplyUnallocatedMemorandumsFormValues = {
    creditMemorandums: [],
    debitMemorandums: [],
    paymentGroupId: nodeId,
    memorandumIdsToAllocate: []
  }

  const handleSuccess = (
    mutationInput?: ApplyUnallocatedMemorandumsToPaymentGroupInput,
    mutationResult?: ApplyUnallocatedMemorandumsToPaymentGroupPayload
  ) => {
    handleOnSuccess({
      apolloEvent: ApolloContextEvents.paymentGroupApplyMemos,
      // needed, otherwise the modal will be closed after the first step
      isModal: false,
      successMessage: translate('modals.applyMemos.notification.success', {
        id
      })
    })()

    onStepCompleted(mutationInput, mutationResult)
  }

  return (
    <FinalForm
      initialValues={initialValues}
      keepDirtyOnReinitialize
      onSubmit={handleSubmit({
        adjustValues,
        handleError: handleOnSubmissionError(responseKey),
        handleSuccess,
        responseKey,
        submit: applyUnallocatedMemorandumsMutation
      })}
      render={(
        formProps: FormRenderProps<ApplyUnallocatedMemorandumsFormValues>
      ) => (
        <ApplyUnallocatedMemorandumsForm
          formProps={formProps}
          nodeId={nodeId}
          unallocatedMemorandums={unallocatedMemorandums?.nodes}
          onSkipToNextStep={onStepCompleted}
        />
      )}
    />
  )
}

PaymentGroupApplyUnallocatedMemosContent.displayName = displayName

export default PaymentGroupApplyUnallocatedMemosContent
