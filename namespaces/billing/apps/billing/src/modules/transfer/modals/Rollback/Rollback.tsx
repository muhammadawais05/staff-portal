import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalSkeleton } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useSetRollbackTransferMutation } from './data/setRollbackInvoiceTransfer.graphql.types'
import { useGetTransfer } from '../../data'
import RollbackForm from '../../components/RollbackForm/RollbackForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'RollbackTransferModal'
const responseKey = 'rollbackInvoiceTransfer'

const PostponeTransferModal = ({ options: { nodeId: transferId } }: Props) => {
  const { t: translate } = useTranslation('transfers')

  const transferNodeId = encodeId({ id: transferId, type: 'transfer' })
  const { handleOnCloseModal } = useModals()
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setRollbackTransferMutation] = useSetRollbackTransferMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { data: transfer, loading } = useGetTransfer(transferNodeId)

  if (loading) {
    return <ModalSkeleton title={translate('rollbackForm.title')} />
  }

  if (
    !isOperationEnabled({
      operations: transfer?.operations,
      key: 'rollbackTransfer'
    })
  ) {
    handleOnCloseModal()

    return null
  }

  const invoiceId = transfer?.document?.id || ''
  const initialValues = {
    comment: '',
    invoiceId,
    transferId: transferNodeId
  }

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.transferRollback,
      successMessage: translate('rollbackForm.notification.success')
    }),
    responseKey,
    submit: setRollbackTransferMutation,
    variables: {
      invoiceId,
      transferId: transferNodeId
    }
  })

  return (
    <RollbackForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      amount={transfer.amount}
    />
  )
}

PostponeTransferModal.displayName = displayName

export default memo(PostponeTransferModal)
