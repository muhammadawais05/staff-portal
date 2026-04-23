import React from 'react'
import { GigFragment } from '@staff-portal/talents-gigs'

type Props = {
  request: GigFragment
}

const Request = ({ request }: Props) => {
  return <div data-testid='p2p-request'>{request.description}</div>
}

export default Request
