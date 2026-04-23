import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import { CollectBadDebtInvoiceInput } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import CollectBadDebtForm from './components/CollectBadDebtForm'
import { useSetCollectBadDebtInvoiceMutation } from '../../data/setCollectBadDebtInvoice.graphql.types'

const displayName = 'InvoiceCollectBadDebtModal'
const responseKey = 'collectBadDebtInvoice'

interface Props {
  invoiceId: string
}

const InvoiceCollectBadDebtModal: FC<Props> = memo<Props>(({ invoiceId }) => {
  const { t: translate } = useTranslation('invoice')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [collectBadDebtInvoiceMutation] = useSetCollectBadDebtInvoiceMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const documentNumber = decodeId({ type: 'invoice', id: invoiceId })
  const initialValues: CollectBadDebtInvoiceInput = {
    comment: '',
    feeAmount: '',
    invoiceId,
    transferAmount: ''
  }

  return (
    <CollectBadDebtForm
      invoiceDocumentNumber={documentNumber}
      initialValues={initialValues}
      handleOnSubmit={handleSubmit({
        handleError: handleOnSubmissionError(responseKey),
        handleSuccess: (input: CollectBadDebtInvoiceInput) => {
          handleOnSuccess({
            apolloEvent: ApolloContextEvents.invoiceCollectBadDebt,
            successMessage: translate(
              'collectBadDebtModal.notification.success',
              {
                collectedAmount: formatAmount({
                  amount: Number(input.transferAmount) + Number(input.feeAmount)
                }),
                documentNumber
              }
            )
          })()
        },
        responseKey,
        submit: collectBadDebtInvoiceMutation
      })}
    />
  )
})

InvoiceCollectBadDebtModal.displayName = displayName

export default InvoiceCollectBadDebtModal
