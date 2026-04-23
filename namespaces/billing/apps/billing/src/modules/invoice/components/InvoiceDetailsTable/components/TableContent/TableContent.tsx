import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { useTranslation } from 'react-i18next'

import PurchaseOrderLine from '../PurchaseOrderLine'
import getDetailsTableItems, { getItemsAsPairs } from '../../utils'
import { GetInvoiceDetailsTableQuery } from '../../data/getInvoiceDetailsTable.graphql.types'

interface Props {
  invoice: Exclude<GetInvoiceDetailsTableQuery['node'], null | undefined>
  poLinesEnabled: boolean
}

export const TableContent = ({ invoice, poLinesEnabled = false }: Props) => {
  const { t: translate } = useTranslation('invoice')

  const { invoiceKind, job } = invoice

  const isConsolidatedInvoice = invoiceKind === InvoiceKind.CONSOLIDATED

  const isJobVisible = !isConsolidatedInvoice && !!job

  const visibleItems = getDetailsTableItems(invoice, poLinesEnabled).filter(
    item => Boolean(!item?.hidden)
  )

  const [firstPair, secondPair, ...restOfPairs] = getItemsAsPairs(visibleItems)

  return (
    <DetailedList striped labelColumnWidth={12}>
      {[firstPair, secondPair]?.map(pair => {
        return (
          <DetailedList.Row key={`parent|${pair[0].id}`}>
            {pair.map(item => (
              <DetailedList.Item
                key={`column|${item.id}`}
                label={item.label}
                value={item.value}
              />
            ))}
          </DetailedList.Row>
        )
      })}
      {poLinesEnabled && (
        <>
          {isJobVisible && (
            <DetailedList.Row>
              <DetailedList.Item
                label={translate('invoiceDetails.engagement')}
                value={
                  <WebResourceLinkWrapper
                    webResource={job?.webResource}
                    weight='semibold'
                    data-testid='engagement-link'
                    size='medium'
                  />
                }
              />
            </DetailedList.Row>
          )}
          <DetailedList.Row>
            <DetailedList.Item
              label={translate('invoiceDetails.purchaseOrder')}
              value={<PurchaseOrderLine invoice={invoice} />}
            />
          </DetailedList.Row>
        </>
      )}

      {restOfPairs?.map(pair => {
        return (
          <DetailedList.Row key={`parent|${pair[0].id}`}>
            {pair.map(item => (
              <DetailedList.Item
                key={`column|${item?.id}`}
                label={item?.label}
                value={item?.value}
              />
            ))}
          </DetailedList.Row>
        )
      })}
    </DetailedList>
  )
}

export default TableContent
