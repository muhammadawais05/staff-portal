import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import InvoiceDisputeTalentModalForm from '../DisputeTalentModalForm'
import { useSetDisputeTalentPaymentsMutation } from '../../data/setDisputeTalentPayments.graphql.types'

const displayName = 'InvoiceDisputeTalentModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const responseKey = 'disputeTalentPayments'

const InvoiceDisputeTalentModal: FC<Props> = memo(
  ({ options: { nodeId: documentNumber } }) => {
    const { t: translate } = useTranslation('invoice')
    const invoiceNodeId = encodeId({ id: documentNumber, type: 'invoice' })
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
    const [setDisputeTalentPaymentsMutation] =
      useSetDisputeTalentPaymentsMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const initialValues = {
      invoiceId: invoiceNodeId,
      comment: ''
    }

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.invoiceDisputeTalent,
        successMessage: translate('disputeTalentModal.notification.success', {
          documentNumber
        })
      }),
      responseKey,
      submit: setDisputeTalentPaymentsMutation,
      variables: { invoiceId: invoiceNodeId }
    })

    return (
      <InvoiceDisputeTalentModalForm
        invoiceDocumentNumber={documentNumber}
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
      />
    )
  }
)

InvoiceDisputeTalentModal.displayName = displayName

export default InvoiceDisputeTalentModal
