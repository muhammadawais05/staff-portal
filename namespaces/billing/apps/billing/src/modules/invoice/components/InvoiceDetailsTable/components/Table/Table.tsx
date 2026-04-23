import { Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import DetailsDescription from '../../../../../commercialDocument/components/DetailsDescription'
import { GetInvoiceDetailsTableQuery } from '../../data/getInvoiceDetailsTable.graphql.types'
import TableContent from '../TableContent'

const displayName = 'InvoiceDetailsTable'

interface Props {
  invoice: Exclude<GetInvoiceDetailsTableQuery['node'], null | undefined>
  poLinesEnabled: boolean
}

export const InvoiceDetailsTable = ({
  invoice,
  poLinesEnabled = false
}: Props) => {
  const { description, documentNote } = invoice
  const { t: translate } = useTranslation('invoice')

  return (
    <Section
      title={translate('invoiceDetails.subtitle')}
      data-testid='InvoiceDetailsTable'
    >
      <TableContent invoice={invoice} poLinesEnabled={poLinesEnabled} />

      <DetailsDescription
        description={description}
        documentNote={documentNote}
      />
    </Section>
  )
}

InvoiceDetailsTable.displayName = displayName

export default InvoiceDetailsTable
