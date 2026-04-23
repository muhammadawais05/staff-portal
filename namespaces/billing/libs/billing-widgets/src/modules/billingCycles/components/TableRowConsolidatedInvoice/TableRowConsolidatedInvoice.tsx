import { PortfolioFinance16, Tooltip, Typography } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Invoice } from '@staff-portal/graphql/staff'

import * as S from './styles'

const displayName = 'TableRowConsolidatedInvoice'

interface Props {
  invoice?: Pick<Invoice, 'webResource' | 'documentNumber'>
}

const TableRowConsolidatedInvoice: FC<Props> = memo(({ invoice }) => {
  const { t: translate } = useTranslation('billingCycleTable')

  if (!invoice) {
    return null
  }

  const { documentNumber, webResource: { text, url } = {} } = invoice

  const tooltip = (
    <Typography>
      {translate('ConsolidatedInvoice')}
      <br />
      {url ? (
        <Link data-testid='consolidated-link' href={url} target='_blank'>
          <span data-testid='consolidated-document-number'>{text}</span>
        </Link>
      ) : (
        <span data-testid='consolidated-document-number'>
          #{documentNumber}
        </span>
      )}
    </Typography>
  )

  return (
    <Tooltip
      css={S.tableConsolidatedTooltip}
      content={tooltip}
      interactive
      placement='right'
    >
      <Typography data-testid='consolidated-icon'>
        <PortfolioFinance16 css={S.tableConsolidatedIcon} />
      </Typography>
    </Tooltip>
  )
})

TableRowConsolidatedInvoice.displayName = displayName

export default TableRowConsolidatedInvoice
