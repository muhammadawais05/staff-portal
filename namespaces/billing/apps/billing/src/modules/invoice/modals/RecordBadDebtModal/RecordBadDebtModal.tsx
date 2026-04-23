import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import InvoiceRecordBadDebtModalForm from '../RecordBadDebtModalForm'
import { useSetRecordBadDebtMutation } from '../../data/setRecordBadDebt.graphql.types'

const responseKey = 'recordBadDebt'
const displayName = 'InvoiceRecordBadDebtModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const InvoiceRecordBadDebtModal: FC<Props> = memo(
  ({ options: { nodeId: documentNumber } }) => {
    const { t: translate } = useTranslation('invoice')
    const invoiceNodeId = encodeId({ id: documentNumber, type: 'invoice' })
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
    const [setRecordBadDebtMutation] = useSetRecordBadDebtMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.invoiceRecordBadDebt,
        successMessage: translate('recordBadDebtModal.notification.success', {
          documentNumber
        })
      }),
      responseKey,
      submit: setRecordBadDebtMutation
    })

    const initialValues = {
      comment: '',
      invoiceId: invoiceNodeId
    }

    return (
      <InvoiceRecordBadDebtModalForm
        invoiceDocumentNumber={documentNumber}
        initialValues={initialValues}
        handleOnSubmit={handleOnSubmit}
      />
    )
  }
)

InvoiceRecordBadDebtModal.displayName = displayName

export default InvoiceRecordBadDebtModal
