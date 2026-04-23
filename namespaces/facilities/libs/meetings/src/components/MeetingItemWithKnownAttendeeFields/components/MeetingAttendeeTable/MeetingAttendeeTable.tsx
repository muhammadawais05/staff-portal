import { Table } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'
const MeetingAttendeeTable = ({ children }: { children: ReactNode }) => {
  return (
    <Table data-testid='attendees-log-table'>
      <Table.Head>
        <Table.Row>
          <Table.Cell css={S.commonColumn}>Name</Table.Cell>
          <Table.Cell css={S.commonColumn}>Country</Table.Cell>
          <Table.Cell css={S.commonColumn}>Join Time</Table.Cell>
          <Table.Cell css={S.commonColumn}>Leave Time</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>{children}</Table.Body>
    </Table>
  )
}

export default MeetingAttendeeTable
