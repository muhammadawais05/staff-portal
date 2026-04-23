import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import WriteOffModalForm from '../WriteOffModalForm'
import { useSetWriteOffInvoiceMutation } from './data/setWriteOffInvoice.graphql.types'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'WriteOffModal'
const responseKey = 'writeOffInvoice'

const WriteOffModal = ({ options: { nodeId: documentNumber } }: Props) => {
  const invoiceId = encodeId({ id: documentNumber, type: 'invoice' })
  const { t: translate } = useTranslation('invoice')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [invoiceWriteOffGatewayMutation] = useSetWriteOffInvoiceMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.invoiceWriteOff,
      successMessage: translate('writeOffModalForm.notification.success', {
        documentNumber
      })
    }),
    responseKey,
    submit: invoiceWriteOffGatewayMutation
  })

  const initialValues = {
    comment: '',
    invoiceId
  }

  return (
    <WriteOffModalForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      documentNumber={documentNumber}
    />
  )
}

WriteOffModal.displayName = displayName

export default memo(WriteOffModal)
