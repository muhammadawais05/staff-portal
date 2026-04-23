import React from 'react'
import { Table } from '@toptal/picasso'

import { AvailabilityRequestsFragment } from '../../data/availability-requests-fragment'
import AvailabilityRequestRow from '../AvailabilityRequestRow'

interface Props {
  availabilityRequests: AvailabilityRequestsFragment[]
}

const AvailabilityRequestsTable = ({
  availabilityRequests
}: Props) => {
  return <Table variant='striped'>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Request for</Table.Cell>
        <Table.Cell>Status</Table.Cell>
        <Table.Cell>Created</Table.Cell>
        <Table.Cell>Actions</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {availabilityRequests.map((availabilityRequest, index) => (
        <AvailabilityRequestRow
          key={availabilityRequest.id}
          stripeEven={Boolean(index % 2)}
          availabilityRequest={availabilityRequest}
        />
      ))}
    </Table.Body>
  </Table>
}

export default AvailabilityRequestsTable
