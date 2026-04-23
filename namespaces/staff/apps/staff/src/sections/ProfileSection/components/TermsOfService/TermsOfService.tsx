import React from 'react'
import { useUserDateFormatter } from '@staff-portal/current-user'

type Props = {
  tosAcceptedAt?: string | null
}

const TermsOfService = ({ tosAcceptedAt }: Props) => {
  const userDateFormatter = useUserDateFormatter()

  return (
    <>
      {tosAcceptedAt
        ? `Accepted on ${userDateFormatter(tosAcceptedAt)}`
        : 'Not accepted'}
    </>
  )
}

export default TermsOfService
