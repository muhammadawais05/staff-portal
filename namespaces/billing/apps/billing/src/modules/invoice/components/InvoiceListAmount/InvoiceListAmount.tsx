import { TypographyOverflow } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'
import { useCommercialDocumentCreditedMessage } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'
import InvoiceAmountWithColorAndTooltip from '@staff-portal/billing-widgets/src/modules/invoice/components/InvoiceAmountWithColorAndTooltip'

const displayName = 'InvoiceListAmount'

interface Props {
  invoice: InvoiceListItemFragment
}

const InvoiceListAmount: FC<Props> = memo<Props>(({ invoice }) => {
  const balanceData = { ...invoice, amount: invoice.listedAmount }
  const creditedMessage = useCommercialDocumentCreditedMessage(invoice)

  return (
    <>
      <InvoiceAmountWithColorAndTooltip
        invoice={balanceData}
        iconPosition='left'
      />
      {creditedMessage && (
        <TypographyOverflow
          data-testid={`${displayName}-amount-credited`}
          size='xsmall'
          weight='semibold'
        >
          {creditedMessage}
        </TypographyOverflow>
      )}
    </>
  )
})

InvoiceListAmount.displayName = displayName

export default InvoiceListAmount
