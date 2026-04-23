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

import { useGetTransfer } from '../../data'
import { useSetMarkFailedInvoiceTransferMutation } from './data/setFailInvoiceTransfer.graphql.types'
import MarkFailedFrom from '../../components/MarkFailedForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'MarkFailedTransferModal'
const responseKey = 'failInvoiceTransfer'

const MarkFailedTransferModal = ({
  options: { nodeId: transferId }
}: Props) => {
  const { t: translate } = useTranslation('transfers')

  const transferNodeId = encodeId({ id: transferId, type: 'transfer' })
  const { handleOnCloseModal } = useModals()
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setMarkFailedInvoiceTransferMutation] =
    useSetMarkFailedInvoiceTransferMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const { data: transfer, loading } = useGetTransfer(transferNodeId)

  if (loading) {
    return <ModalSkeleton title={translate('markFailedForm.title')} />
  }

  if (
    !isOperationEnabled({
      operations: transfer.operations,
      key: 'failTransfer'
    })
  ) {
    // TODO:
    // UX improvements
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
      apolloEvent: ApolloContextEvents.transferMarkFailed,
      successMessage: translate('markFailedForm.notification.success')
    }),
    responseKey,
    submit: setMarkFailedInvoiceTransferMutation,
    variables: {
      invoiceId,
      transferId: transferNodeId
    }
  })

  return (
    <MarkFailedFrom
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
    />
  )
}

MarkFailedTransferModal.displayName = displayName

export default memo(MarkFailedTransferModal)
