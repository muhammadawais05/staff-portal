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
import { getCurrentTime } from '@staff-portal/billing/src/_lib/dateTime'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import PayForm from '../../components/PayForm'
import { useSetPayTransferMutation } from './data/setPayTransfer.graphql.types'
import { useGetTransfer } from '../../data'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'PayTransferModal'
const responseKey = 'payTransfer'

const PayTransferModal = ({ options: { nodeId: transferId } }: Props) => {
  const { t: translate } = useTranslation('transfers')

  const transferNodeId = encodeId({ id: transferId, type: 'transfer' })
  const { handleOnCloseModal } = useModals()
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [setPayTransferMutation] = useSetPayTransferMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { data: transfer, loading } = useGetTransfer(transferNodeId)

  if (loading) {
    return <ModalSkeleton title={translate('payForm.title')} />
  }

  if (
    !isOperationEnabled({
      operations: transfer?.operations,
      key: 'payTransfer'
    })
  ) {
    // TODO:
    // UX improvements
    handleOnCloseModal()

    return null
  }

  const invoiceId = transfer?.document?.id || ''
  const initialValues = {
    amount: transfer.amount,
    comment: '',
    invoiceId,
    effectiveDate: getCurrentTime().toJSDate(),
    transferId: transferNodeId
  }

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.transferPay,
      successMessage: translate('payForm.notification.success')
    }),
    responseKey,
    submit: setPayTransferMutation,
    variables: {
      invoiceId,
      transferId: transferNodeId
    }
  })

  return (
    <PayForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      transfer={transfer}
    />
  )
}

PayTransferModal.displayName = displayName

export default memo(PayTransferModal)
