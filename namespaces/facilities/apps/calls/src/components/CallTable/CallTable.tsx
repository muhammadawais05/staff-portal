import { Table } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'
const CallTable = ({ children }: { children: ReactNode }) => {
  return (
    <Table data-testid='call-table'>
      <Table.Head>
        <Table.Row>
          <Table.Cell css={S.dateColumn}>Date</Table.Cell>
          <Table.Cell css={S.timeColumn}>Time</Table.Cell>
          <Table.Cell css={S.typeColumn}>Type</Table.Cell>
          <Table.Cell css={S.userColumn}>User</Table.Cell>
          <Table.Cell css={S.detailsColumn}>Contact Details</Table.Cell>
          <Table.Cell css={S.purposeColumn}>Purpose</Table.Cell>
          <Table.Cell css={S.durationColumn}>Duration</Table.Cell>
          <Table.Cell css={S.actionsColumn} />
        </Table.Row>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table>
  )
}

export default CallTable
