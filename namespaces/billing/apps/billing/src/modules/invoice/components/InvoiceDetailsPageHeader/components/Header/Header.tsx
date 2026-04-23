import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react'
import { noop } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'
import { Button } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import Actions from '@staff-portal/billing/src/components/Actions'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { isAnyOperationIsNotHidden } from '@staff-portal/billing/src/_lib/helpers/operations'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'
import { invoiceDetailsUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/invoice/messages'

import { useGetInvoiceDetailsHeader } from '../../data'
import DetailsHeader from '../../../../../commercialDocument/components/DetailsHeader'
import { useActionsInvoice } from '../../../../utils/useActionsInvoice'
import {
  getInvoiceDetailsHeaderPayOperation,
  invoiceActionHandler,
  invoiceDetailsActions,
  isInvoiceOriginal,
  isInvoicePayable
} from '../../../../utils'

const displayName = 'InvoiceDetailsPageHeader'

const disabledDownloadOperation: OperationItemFragment = {
  callable: OperationCallableTypes.DISABLED,
  messages: [i18n.t('invoice:operations.downloadDisabled')]
}

interface Props {
  invoiceId: string
}

const InvoiceDetailsPageHeader: FC<Props> = memo(({ invoiceId }) => {
  const [mutationIsProcessing, setMutationIsProcessing] = useState(false)
  const { t: translate } = useTranslation('invoice')
  const { handleOnOpenModalWithUrlSearch: handleOnOpenModal } = useModals()
  const { handleOnApplyPromotions } = useActionsInvoice()
  const handleOnInvoiceActionsClick = useCallback(
    async (e: SyntheticEvent<HTMLElement, Event>) => {
      setMutationIsProcessing(true)
      await invoiceActionHandler({
        handleOnApplyPromotions,
        handleOnOpenModal
      })(e)
      setMutationIsProcessing(false)
    },
    [handleOnApplyPromotions, handleOnOpenModal]
  )
  const {
    data,
    initialLoading,
    loading,
    refetch = noop
  } = useGetInvoiceDetailsHeader(invoiceId)

  useRefetch(invoiceDetailsUpdateDataEvents, refetch)

  if (initialLoading) {
    return <InlineActionsSkeleton />
  }

  const {
    gid,
    webResource,
    downloadPdfUrl,
    downloadHtmlUrl,
    operations,
    documentNumber,
    historyLink
  } = data
  const isOriginal = isInvoiceOriginal(data)
  const isPayable = isInvoicePayable(data)

  // TODO:
  // Techdebt this should be an Operation
  const extendedOperations = !isOriginal
    ? operations
    : {
        ...operations,
        disabledDownloadPdfUrl: disabledDownloadOperation,
        disabledDownloadHtmlUrl: disabledDownloadOperation
      }

  const isMoreActionsVisible = isAnyOperationIsNotHidden(extendedOperations)

  return (
    <>
      <OperationWrapper operation={getInvoiceDetailsHeaderPayOperation(data)}>
        <Button
          data-testid='add-payment'
          data-document-number={documentNumber}
          data-value={ModalKey.invoicePay}
          size='small'
          onClick={handleOnInvoiceActionsClick}
          variant={isPayable ? 'primary' : 'secondary'}
        >
          {translate('invoiceDetails.header.actions.addPayment')}
        </Button>
      </OperationWrapper>

      <DetailsHeader
        gid={gid}
        type='invoices'
        isLoading={mutationIsProcessing}
        isDisabled={loading}
        renderRecentActivityButton={Boolean(historyLink?.url)}
        MoreActions={
          isMoreActionsVisible ? (
            <Actions
              actionItems={
                !isOriginal
                  ? invoiceDetailsActions
                  : [
                      'disabledDownloadPdfUrl',
                      'disabledDownloadHtmlUrl',
                      ...invoiceDetailsActions
                    ]
              }
              documentNumber={documentNumber}
              downloadHtmlUrl={downloadHtmlUrl}
              downloadPdfUrl={downloadPdfUrl}
              handleOnClick={handleOnInvoiceActionsClick}
              operations={extendedOperations}
              translationCode='invoice'
              webResource={webResource}
            />
          ) : undefined
        }
      />
    </>
  )
})

InvoiceDetailsPageHeader.displayName = displayName

export default InvoiceDetailsPageHeader
