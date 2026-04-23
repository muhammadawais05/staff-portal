import React from 'react'
import { GigFragment } from '@staff-portal/talents-gigs'

type Props = {
  request: GigFragment
}

const RequestDetails = ({ request }: Props) => (
  <div data-testid='p2p-request-details'>Details for {request.id}</div>
)

export default RequestDetails
