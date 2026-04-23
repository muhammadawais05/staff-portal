import { CallRequestType } from '@staff-portal/clients-call-requests'
import React from 'react'

export const getCallRequestText = (
  type?: string | null,
  scheduledAt?: string | null,
  timeZoneName?: string
) => {
  if (type === CallRequestType.INSTANT) {
    return (
      <>
        The company has an <strong>instant</strong> callback request.
      </>
    )
  }

  return (
    <>
      The company has a callback request <strong>scheduled</strong> for{' '}
      <strong>
        {scheduledAt} {timeZoneName}
      </strong>
      .
    </>
  )
}
