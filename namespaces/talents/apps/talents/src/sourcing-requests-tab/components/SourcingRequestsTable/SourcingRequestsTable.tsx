import { Table, Typography } from '@toptal/picasso'
import React from 'react'
import { TableSkeleton } from '@staff-portal/ui'
import { useTouchCounter, CounterName } from '@staff-portal/counters'

import { SourcingRequestFragment } from '../data/get-talent-sourcing-requests'
import SourcingRequestsTableHeader from '../SourcingRequestsTableHeader'
import SourcingRequestsTableRow from '../SourcingRequestsTableRow'

interface Props {
  sourcingRequests?: SourcingRequestFragment[]
  loading: boolean
}

const SourcingRequestsTable = ({ sourcingRequests, loading }: Props) => {
  useTouchCounter({
    counterName: CounterName.SourcingRequests
  })

  if (!loading && !sourcingRequests?.length) {
    return (
      <Typography size='medium'>
        This talent is not currently linked to any sourcing request.
      </Typography>
    )
  }

  if (loading) {
    return <TableSkeleton rows={3} cols={4} />
  }

  return (
    <Table variant='striped'>
      <Table.Head>
        <SourcingRequestsTableHeader />
      </Table.Head>
      <Table.Body>
        {sourcingRequests?.map((sourcingRequest, index) => (
          <SourcingRequestsTableRow
            key={sourcingRequest.id}
            stripeEven={Boolean(index % 2)}
            sourcingRequest={sourcingRequest}
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default SourcingRequestsTable
