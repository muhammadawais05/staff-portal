import { Button } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import Actions from '@staff-portal/billing/src/components/Actions'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import i18n from '@staff-portal/billing/src/utils/i18n'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { isAnyOperationIsNotHidden } from '@staff-portal/billing/src/_lib/helpers/operations'
import {
  paymentDetailsActions,
  paymentActionHandler,
  paymentDetailsUpdateDataEvents
} from '@staff-portal/billing-widgets/src/modules/payment/utils'

import { useGetPaymentDetailsHeader } from '../data'
import DetailsHeader from '../../../../commercialDocument/components/DetailsHeader'

const displayName = 'PaymentDetailsPageHeader'

const disabledDownloadOperation: OperationItemFragment = {
  callable: OperationCallableTypes.DISABLED,
  messages: [i18n.t('payment:operations.downloadDisabled')]
}

interface Props {
  paymentId: string
}

const PaymentDetailsPageHeader: FC<Props> = memo<Props>(({ paymentId }) => {
  const { t: translate } = useTranslation('payment')
  const {
    data: payment,
    initialLoading,
    loading,
    refetch
  } = useGetPaymentDetailsHeader(paymentId)
  const { handleOnOpenModalWithUrlSearch: handleOnOpenModal } = useModals()
  const handleOnClick = paymentActionHandler({ handleOnOpenModal })

  // TODO:
  // Confirm it after mutation data return
  useRefetch(paymentDetailsUpdateDataEvents, refetch)

  if (initialLoading || loading) {
    return <InlineActionsSkeleton />
  }

  const {
    documentNumber,
    downloadHtmlUrl,
    downloadPdfUrl,
    webResource,
    operations,
    gid,
    historyLink
  } = payment

  const disabledOperations = {} as Record<
    'disabledDownloadPdfUrl' | 'disabledDownloadHtmlUrl',
    OperationItemFragment
  >

  if (downloadHtmlUrl === null) {
    disabledOperations.disabledDownloadHtmlUrl = disabledDownloadOperation
  }
  if (downloadPdfUrl === null) {
    disabledOperations.disabledDownloadPdfUrl = disabledDownloadOperation
  }

  // TODO:
  // Techdebt extending operations data with downloadlinks visiblity
  const extendedOperations = { ...disabledOperations, ...operations }
  const isMoreActionsVisible = isAnyOperationIsNotHidden(extendedOperations)

  return (
    <>
      <OperationWrapper operation={operations.payPayment}>
        <Button
          data-document-number={documentNumber}
          data-testid='add-payment'
          data-value='payPayment'
          onClick={handleOnClick}
          size='small'
        >
          {translate('page.header.actions.pay')}
        </Button>
      </OperationWrapper>
      <DetailsHeader
        gid={gid}
        renderRecentActivityButton={Boolean(historyLink?.url)}
        type='payments'
        MoreActions={
          isMoreActionsVisible ? (
            <Actions
              actionItems={[
                ...Object.keys(disabledOperations),
                ...paymentDetailsActions
              ]}
              documentNumber={documentNumber}
              downloadHtmlUrl={downloadHtmlUrl}
              downloadPdfUrl={downloadPdfUrl}
              handleOnClick={handleOnClick}
              operations={extendedOperations}
              translationCode='payment'
              webResource={webResource}
            />
          ) : undefined
        }
      />
    </>
  )
})

PaymentDetailsPageHeader.displayName = displayName

export default PaymentDetailsPageHeader
