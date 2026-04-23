import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useInvoiceListContext } from '../../../../contexts/invoiceListContext'
import { useGetInvoiceListConsolidationOperationQuery } from '../../data/getInvoiceListConsolidationOperation.graphql.types'

const displayName = 'InvoiceListHeaderConsolidatedButton'

const InvoiceListHeaderConsolidatedButton: FC = memo(() => {
  const { t: translate } = useTranslation('invoiceList')
  const { handleOnOpenModal } = useModals()
  const { filter } = useInvoiceListContext()

  // When at least one of those statuses is selected,
  // we can pass "forConsolidation" to the filter
  const consolidationStatuses = [
    DocumentStatus.OUTSTANDING,
    DocumentStatus.PENDING_RECEIPT,
    DocumentStatus.OVERDUE,
    DocumentStatus.DRAFT
  ]

  const forConsolidation = filter.statuses?.some(status =>
    consolidationStatuses.includes(status)
  )

  const {
    data: { operations: { consolidateInvoices } } = { operations: {} },
    refetch
  } = useGetData(useGetInvoiceListConsolidationOperationQuery, 'invoices')(
    {
      filter: {
        ...filter,
        forConsolidation
      },
      pagination: {
        limit: 0,
        offset: 0
      }
    },
    { abortKey: displayName }
  )

  useRefetch(ApolloContextEvents.invoiceConsolidatedCreate, refetch)

  const handleOnConsolidatedClick = () =>
    handleOnOpenModal(ModalKey.consolidatedInvoiceCreate, {
      data: filter
    })

  return (
    <OperationWrapper operation={consolidateInvoices}>
      <Button
        data-testid={displayName}
        onClick={handleOnConsolidatedClick}
        size='small'
      >
        {translate('header.actions.createConsolidated')}
      </Button>
    </OperationWrapper>
  )
})

InvoiceListHeaderConsolidatedButton.displayName = displayName

export default InvoiceListHeaderConsolidatedButton
