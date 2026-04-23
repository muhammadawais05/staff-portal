import { Table } from '@toptal/picasso'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'

const displayName = 'EmailStatusPanelHeader'

const TableRow = Table.Row
const TableCell = Table.Cell
const TableHead = Table.Head

const EmailStatusPanelHeader = () => {
  const { t: translate } = useTranslation('emailStatus')

  return (
    <TableHead data-testid={displayName}>
      <TableRow>
        <TableCell css={S.recipient} data-testid={`${displayName}-recipient`}>
          {translate(`table.header.recipient`)}
        </TableCell>
        <TableCell css={S.status} data-testid={`${displayName}-status`}>
          {translate(`table.header.status`)}
        </TableCell>
        <TableCell css={S.message} data-testid={`${displayName}-message`}>
          {translate(`table.header.message`)}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

EmailStatusPanelHeader.displayName = displayName

export default EmailStatusPanelHeader
