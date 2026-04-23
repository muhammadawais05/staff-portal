import { Link } from '@staff-portal/navigation'
import React from 'react'

import { EngagementStatusPerformerFragment } from '../../EngagementStatusSection/data'

export const getPerformer = (
  performer?: EngagementStatusPerformerFragment | null
) => {
  if (!performer) {
    return 'System'
  }

  const {
    webResource: { url, text }
  } = performer

  return (
    <Link href={url || undefined}>
      {text}
      {'client' in performer && ` (${performer.client.fullName})`}
    </Link>
  )
}
