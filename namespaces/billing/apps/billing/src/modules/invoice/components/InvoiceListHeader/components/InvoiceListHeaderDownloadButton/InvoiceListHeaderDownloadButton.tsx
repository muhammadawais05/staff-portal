import { Button } from '@toptal/picasso'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Maybe } from '@staff-portal/graphql/staff'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

interface Props {
  operation: OperationItemFragment
  url?: Maybe<string>
}

const displayName = 'InvoiceListHeaderDownloadButton'

const InvoiceListHeaderDownloadButton = ({ url, operation }: Props) => {
  const { t: translate } = useTranslation('invoiceList')

  return (
    <OperationWrapper operation={operation}>
      <Button
        data-testid={displayName}
        download
        href={url || undefined}
        size='small'
        target='_blank'
        disabled={!url}
      >
        {translate('header.actions.downloadInvoices')}
      </Button>
    </OperationWrapper>
  )
}

InvoiceListHeaderDownloadButton.displayName = displayName

export default InvoiceListHeaderDownloadButton
