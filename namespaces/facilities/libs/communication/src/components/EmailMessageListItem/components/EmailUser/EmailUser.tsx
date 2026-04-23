import React from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import { Link, createUrl } from '@staff-portal/navigation'
import { PLATFORM_API_URL } from '@staff-portal/config'

export interface Props {
  emailAddresses: string[]
  userName: string
  path?: string
}

const EmailUser = ({ emailAddresses, userName, path }: Props) => {
  return (
    <Tooltip
      content={
        <>
          {emailAddresses.map(email => (
            <Typography invert key={email}>
              {email}
            </Typography>
          ))}
        </>
      }
    >
      <Link
        href={createUrl(path || '', PLATFORM_API_URL)?.href}
        // TODO: never worked as expected
        // disabled={!path}
        data-testid='email-address'
      >
        {userName}
      </Link>
    </Tooltip>
  )
}

export default EmailUser
