import React from 'react'
import { Tooltip } from '@toptal/picasso'

export interface Props {
  emailAddress: string
}

const EmailAddressBlacklisted = ({ emailAddress }: Props) => {
  return (
    <Tooltip content='This email address is blacklisted'>
      <span>{emailAddress}</span>
    </Tooltip>
  )
}

export default EmailAddressBlacklisted
