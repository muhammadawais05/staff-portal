import { Typography } from '@toptal/picasso'
import React from 'react'
import { useUserDateFormatter } from '@staff-portal/current-user'

interface Props {
  stepTitle: string
  testName?: string
  createdAt?: string
}

const PendingOnlineTest = ({ stepTitle, testName, createdAt }: Props) => {
  const dateFormatter = useUserDateFormatter()

  const formattedDate = dateFormatter(createdAt)

  return (
    <>
      Are you sure you want to approve the {stepTitle} step? The corresponding
      test, "{testName}" was sent to the talent on {formattedDate} but it is
      still{' '}
      <Typography as='span' color='red' weight='semibold'>
        pending
      </Typography>
      .
    </>
  )
}

export default PendingOnlineTest
