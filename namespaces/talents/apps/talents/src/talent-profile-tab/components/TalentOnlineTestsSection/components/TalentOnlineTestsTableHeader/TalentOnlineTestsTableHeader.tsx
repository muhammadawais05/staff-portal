import React from 'react'
import { Table } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  actionsVisible: boolean
}

const TalentOnlineTestsTableHeader = ({ actionsVisible }: Props) => {
  return <Table.Row>
    <Table.Cell>Test</Table.Cell>
    <Table.Cell>Tracking</Table.Cell>
    <Table.Cell>Status</Table.Cell>
    <Table.Cell>Sent</Table.Cell>
    <Table.Cell>Completed</Table.Cell>
    {actionsVisible && (
      <Table.Cell
        data-testid='talent-online-test-column-title-Actions'
        css={S.actionsColumn}
      >
        Actions
      </Table.Cell>
    )}
  </Table.Row>
}

export default TalentOnlineTestsTableHeader
