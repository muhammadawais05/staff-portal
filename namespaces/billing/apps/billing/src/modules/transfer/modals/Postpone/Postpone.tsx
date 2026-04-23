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
import { parse } from '@staff-portal/billing/src/_lib/dateTime'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useGetTransfer } from '../../data'
import { useSetPostponeTransferMutation } from './data/setPostponeInvoiceTransfer.graphql.types'
import PostponeForm from '../../components/PostponeForm'
import adjustValues from './adjustValues'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'PostponeTransferModal'
const responseKey = 'postponeInvoiceTransfer'

const PostponeTransferModal = ({ options: { nodeId: transferId } }: Props) => {
  const { t: translate } = useTranslation('transfers')

  const transferNodeId = encodeId({ id: transferId, type: 'transfer' })
  const { handleOnCloseModal } = useModals()
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setPostponeTransferMutation] = useSetPostponeTransferMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { data: transfer, loading } = useGetTransfer(transferNodeId)

  if (loading) {
    return <ModalSkeleton title={translate('postponeForm.title')} />
  }

  if (
    !isOperationEnabled({
      operations: transfer?.operations,
      key: 'postponeTransfer'
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
    pendingReceiptOn: parse(transfer?.effectiveDate).toJSDate(),
    transferId: transferNodeId
  }

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.transferPostpone,
      successMessage: translate('postponeForm.notification.success')
    }),
    adjustValues,
    responseKey,
    submit: setPostponeTransferMutation,
    variables: {
      invoiceId,
      transferId: transferNodeId
    }
  })

  return (
    <PostponeForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
    />
  )
}

PostponeTransferModal.displayName = displayName

export default memo(PostponeTransferModal)
