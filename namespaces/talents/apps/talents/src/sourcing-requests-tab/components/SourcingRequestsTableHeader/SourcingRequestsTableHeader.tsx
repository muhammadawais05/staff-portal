import React from 'react'
import { Table } from '@toptal/picasso'

import * as S from './styles'

const SourcingRequestsTableHeader = () => {
  return <Table.Row>
    <Table.Cell css={S.noWrap}>Job ID</Table.Cell>
    <Table.Cell css={S.halfWidth}>Job Title</Table.Cell>
    <Table.Cell css={S.halfWidth}>Company</Table.Cell>
    <Table.Cell css={S.noWrap}>Sourcing Request Status</Table.Cell>
  </Table.Row>
}

export default SourcingRequestsTableHeader
