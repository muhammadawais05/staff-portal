import React from 'react'
import { GigFragment } from '@staff-portal/talents-gigs'

type Props = {
  request: GigFragment
}

const RequestsListItem = ({ request }: Props) => {
  return (
    <div>
      <div>{request.title}</div>
      <div>{request.description}</div>
    </div>
  )
}

export default RequestsListItem
