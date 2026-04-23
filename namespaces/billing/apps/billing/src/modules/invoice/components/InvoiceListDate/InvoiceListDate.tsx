import React, { FC, memo } from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'
import { useCommercialDocumentDueMessage } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

const displayName = 'InvoiceListDate'

interface Props {
  invoice: InvoiceListItemFragment
}

const InvoiceListDate: FC<Props> = memo<Props>(({ invoice }) => {
  const { issueDate } = invoice
  const dueMessage = useCommercialDocumentDueMessage(invoice)

  return (
    <>
      {issueDate && (
        <Typography data-testid={`${displayName}-issue-date`} as='p'>
          {formatDateMed(issueDate)}
        </Typography>
      )}
      {dueMessage && (
        <TypographyOverflow
          data-testid={`${displayName}-due-date`}
          size='xsmall'
        >
          {dueMessage}
        </TypographyOverflow>
      )}
    </>
  )
})

InvoiceListDate.displayName = displayName

export default InvoiceListDate
