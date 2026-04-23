import React from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import { getNameInitials } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { Maybe } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

interface Props {
  fullName?: string
  url?: Maybe<string>
  verticalName?: string
}

export const ClientCardMatcher = ({ fullName, url, verticalName }: Props) => {
  if (!fullName) {
    return <>{NO_VALUE}</>
  }

  const name = getNameInitials(fullName)
  const verticalTooltipName = verticalName ? ` (${verticalName})` : ''
  const tooltipContent = `${fullName}${verticalTooltipName}`

  return (
    <Typography inline size='medium'>
      {url ? (
        <Tooltip content={tooltipContent}>
          <Link href={url} target='_blank' rel='noopener noreferrer'>
            {name}
          </Link>
        </Tooltip>
      ) : (
        name
      )}
    </Typography>
  )
}
