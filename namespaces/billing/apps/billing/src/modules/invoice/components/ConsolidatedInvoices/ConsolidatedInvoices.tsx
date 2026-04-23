import { sumBy } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Section } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { invoiceDetailsUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/invoice/messages'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'

import { useGetConsolidatedInvoices } from '../../data'
import InvoiceList from '../InvoiceList'

const displayName = 'ConsolidatedInvoices'

interface Props {
  invoiceId: string
}

const ConsolidatedInvoices: FC<Props> = memo(({ invoiceId }) => {
  const { data: invoice, refetch } = useGetConsolidatedInvoices(invoiceId)
  const { t: translate } = useTranslation('invoice')

  useRefetch(invoiceDetailsUpdateDataEvents, refetch)

  const consolidatedInvoices = invoice?.unconsolidated
    ? invoice?.formerOriginalInvoices?.nodes
    : invoice?.originalInvoices?.nodes

  if (!consolidatedInvoices?.length) {
    return null
  }

  const consolidatedTotal = sumBy(consolidatedInvoices, consolidatedInvoice => {
    return Number(consolidatedInvoice.cleanOutstandingAmount)
  })

  return (
    <Section
      data-testid={displayName}
      title={translate(
        `components.consolidatedInvoices.${
          invoice?.unconsolidated ? 'originalTitle' : 'title'
        }`
      )}
      subtitle={formatAmount({ amount: consolidatedTotal })}
    >
      <InvoiceList
        invoices={consolidatedInvoices as InvoiceListItemFragment[]}
        originalClientColumnEnabled
      />
    </Section>
  )
})

ConsolidatedInvoices.displayName = displayName

export default ConsolidatedInvoices
