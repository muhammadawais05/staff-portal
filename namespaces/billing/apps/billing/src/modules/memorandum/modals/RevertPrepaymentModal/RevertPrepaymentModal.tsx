import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ModalSkeleton } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import RevertPrepaymentModalForm from '../RevertPrepaymentModalForm'
import { useGetMemorandum } from '../../data'
import { useRevertInvoicePrepaymentsMutation } from './data/revertInvoicePrepayments.graphql.types'

const responseKey = 'revertInvoicePrepayments'
const displayName = 'RevertPrepaymentModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const RevertPrepaymentModal = ({ options: { nodeId, nodeType } }: Props) => {
  const memorandumId = encodeId({
    id: nodeId,
    type: nodeType
  })
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const { t: translate } = useTranslation('memorandum')
  const { handleOnCloseModal } = useModals()
  const [revertInvoicePrepaymentsMutation] =
    useRevertInvoicePrepaymentsMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const { data: memorandum, loading } = useGetMemorandum(memorandumId)

  if (loading) {
    return <ModalSkeleton title={translate('revertPrepaymentModal.title')} />
  }

  if (
    !isOperationEnabled({
      operations: memorandum.operations,
      key: 'revertInvoicePrepayments'
    })
  ) {
    // TODO:
    // UX improvements
    handleOnCloseModal()

    return null
  }

  const { amount, document, number } = memorandum

  const initialValues = {
    comment: '',
    invoiceId: document?.id || '',
    memorandumId
  }

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.memorandumRevertPrepayment,
      successMessage: translate('revertPrepaymentModal.notification.success', {
        documentNumber: document?.documentNumber
      })
    }),
    responseKey,
    submit: revertInvoicePrepaymentsMutation
  })

  return (
    <RevertPrepaymentModalForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      memoNumber={number}
      amount={amount}
      documentNumber={document?.documentNumber as number}
    />
  )
}

RevertPrepaymentModal.displayName = displayName

export default memo(RevertPrepaymentModal)
