import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  formatCleanNumberValue,
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalSkeleton } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useGetTransfer } from '../../data'
import { useSetClaimTransferRefundMutation } from './data/setClaimTransferRefund.graphql.types'
import ClaimRefundForm from '../../components/ClaimRefundForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'ClaimRefundTransferModal'
const responseKey = 'claimTransferRefund'

const ClaimRefundTransferModal = ({
  options: { nodeId: transferId }
}: Props) => {
  const { t: translate } = useTranslation('transfers')
  const transferNodeId = encodeId({ id: transferId, type: 'transfer' })
  const { handleOnCloseModal } = useModals()
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setClaimTransferRefundMutation] = useSetClaimTransferRefundMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { data: transfer, loading } = useGetTransfer(transferNodeId)

  if (loading) {
    return <ModalSkeleton title={translate('claimRefundForm.title')} />
  }

  if (
    !isOperationEnabled({
      operations: transfer?.operations,
      key: 'claimTransferRefund'
    })
  ) {
    // TODO:
    // UX improvements
    handleOnCloseModal()

    return null
  }

  const invoiceId = transfer?.document?.id || ''
  const refundAmount = formatCleanNumberValue(transfer?.amountToRefund || '')
  const initialValues = {
    comment: '',
    invoiceId,
    refundAmount,
    transferId: transferNodeId
  }

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.transferClaimRefund,
      successMessage: translate('claimRefundForm.notification.success')
    }),
    responseKey,
    submit: setClaimTransferRefundMutation,
    variables: {
      invoiceId,
      transferId: transferNodeId
    }
  })

  return (
    <ClaimRefundForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
    />
  )
}

ClaimRefundTransferModal.displayName = displayName

export default memo(ClaimRefundTransferModal)
