import { Table } from '@toptal/picasso'
import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <Table.Row data-testid='TableRow' key={props.memorandum.id}>
    <Table.Cell>{JSON.stringify(props)}</Table.Cell>
  </Table.Row>
))

export default MockComponent
