import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

// TODO: remove these styles after https://toptal-core.atlassian.net/browse/SPB-2178
import * as S from './styles'

const displayName = 'ConsolidationDefaultsTableHeader'

interface Props {
  companyId?: string
}

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

export const ConsolidationDefaultsTableHeader: FC<Props> = memo(() => {
  const { t: translate } = useTranslation('billingDetails')

  return (
    <TableHead>
      <TableRow>
        <TableCell
          css={S.nameCell}
          colSpan={2}
          data-testid={`${displayName}-name`}
        >
          {translate('consolidationDefaults.list.head.name')}
        </TableCell>
        <TableCell
          css={S.creationCell}
          data-testid={`${displayName}-creation-date`}
        >
          {translate('consolidationDefaults.list.head.creationDate')}
        </TableCell>
        <TableCell css={S.statusCell} data-testid={`${displayName}-status`}>
          {translate('consolidationDefaults.list.head.status')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
})

ConsolidationDefaultsTableHeader.displayName = displayName

export default ConsolidationDefaultsTableHeader
