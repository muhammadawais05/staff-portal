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

import UnconsolidateModalForm from '../UnconsolidateModalForm'
import { useSetUnconsolidateInvoiceMutation } from './data/setUnconsolidateInvoice.graphql.types'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'UnconsolidateModal'
const responseKey = 'unconsolidateInvoice'

const UnconsolidateModal = ({ options: { nodeId: documentNumber } }: Props) => {
  const { t: translate } = useTranslation('invoice')
  const invoiceNodeId = encodeId({ id: documentNumber, type: 'invoice' })
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [invoiceUnconsolidateGatewayMutation] =
    useSetUnconsolidateInvoiceMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.invoiceUnconsolidate,
      successMessage: translate('unconsolidateModalForm.notification.success', {
        documentNumber: documentNumber
      })
    }),
    responseKey,
    submit: invoiceUnconsolidateGatewayMutation
  })

  const initialValues = {
    comment: '',
    invoiceId: invoiceNodeId
  }

  return (
    <UnconsolidateModalForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      documentNumber={documentNumber}
    />
  )
}

UnconsolidateModal.displayName = displayName

export default memo(UnconsolidateModal)
