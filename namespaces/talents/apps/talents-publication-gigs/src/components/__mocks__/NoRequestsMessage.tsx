import React from 'react'
import { EmptyBox } from '@staff-portal/ui'

interface Props {
  message: string
}

const NoRequestsMessage = ({ message }: Props) => (
  <div>
    <EmptyBox data-testid='emptyBox' />
    {message}
  </div>
)

export default NoRequestsMessage
