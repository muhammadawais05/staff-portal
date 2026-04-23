import React from 'react'
import { GigFragment } from '@staff-portal/talents-gigs'

type Props = {
  request: GigFragment
}

const RequestActions = ({ request }: Props) => (
  <div data-testid='p2p-request-actions'>Actions {request.id}</div>
)

export default RequestActions
