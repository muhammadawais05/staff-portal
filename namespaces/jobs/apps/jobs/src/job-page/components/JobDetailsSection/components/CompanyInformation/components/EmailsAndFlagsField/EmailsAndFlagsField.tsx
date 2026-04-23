import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

interface Props {
  emailMessagesUrl: string
}

const EmailsAndFlagsField = ({ emailMessagesUrl }: Props) => {
  return (
    <Link href={emailMessagesUrl} data-testid='company-emails'>
      <Typography as='span' size='medium' weight='semibold' color='inherit'>
        →Emails
      </Typography>
    </Link>
  )
}

export default EmailsAndFlagsField
