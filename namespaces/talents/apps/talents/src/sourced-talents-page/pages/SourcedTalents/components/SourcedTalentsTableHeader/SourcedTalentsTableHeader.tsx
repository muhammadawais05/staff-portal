import React from 'react'
import { Table } from '@toptal/picasso'

const cols: { title: string }[] = [
  {
    title: 'Name'
  },
  {
    title: 'Applied'
  },
  {
    title: 'Role'
  },
  {
    title: 'Status'
  },
  {
    title: 'Next Meeting'
  }
]

const SourcedTalentsTableHeader = () => (
  <Table.Row>
    {cols.map(item => (
      <Table.Cell key={item.title}>{item.title}</Table.Cell>
    ))}
  </Table.Row>
)

export default SourcedTalentsTableHeader
